/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { type Request, type Response } from "express";
import log4j, { configure, getLogger, levels } from "log4js";

import { environment } from "@/utils/constants";

type logContent = {
  message: string;
  stack: string | undefined;
};

// Build appenders programmatically so we can optionally add a Loki HTTP appender
const appenders: Record<string, any> = {
  console: {
    layout: {
      pattern: "%[%d %p %c %x{context}%] %x{message}",
      tokens: {
        context: function (logEvent) {
          // Position 0 - LogContext
          if (logEvent.data.length > 1 && logEvent.data[0] !== undefined) {
            return JSON.stringify(logEvent.data[0]);
          }
          return "-";
        },
        message: function (logEvent) {
          // Position 1:n - Log message(s)
          if (logEvent.data.length > 1) {
            const logErrorStack = process.env.LOG_ERROR_STACK;
            const logContent: logContent[] = [];

            logEvent.data.slice(1, logEvent.data.length).forEach((data) => {
              if (data !== undefined) {
                if (data instanceof Error && logEvent.level === levels.ERROR) {
                  if (logErrorStack === "true") {
                    logContent.push({
                      message: data.message,
                      stack: data.stack,
                    });
                  } else {
                    logContent.push({
                      message: data.message,
                      stack: undefined,
                    });
                  }
                } else if (data.length && data.length > 0) {
                  logContent.push(data as logContent);
                }
              }
            });
            if (logContent.length === 1) {
              return JSON.stringify(logContent[0]);
            } else {
              return JSON.stringify(logContent);
            }
          }

          return logEvent.data;
        },
      },
      // Documentation: https://log4js-node.github.io/log4js-node/layouts.html
      type: "pattern",
    },
    type: "stdout",
  },
  dateFile: {
    compress: true,
    daysToKeep: 14,
    filename: `${environment.logDir}/${environment.logFile}`,
    keepFileExt: true,
    layout: { type: "basic" },
    type: "dateFile",
  },
};

// If LOKI_URL is provided, add a simple Loki appender that POSTs to the Loki push API.
// This is intentionally lightweight: it fires off HTTP requests and does not block the
// logging pipeline. It accepts optional LOKI_BASIC_AUTH (base64 user:pass) or
// LOKI_USERNAME/LOKI_PASSWORD for Basic auth, and LOKI_LABELS as comma-separated key=value pairs.
if (process.env.LOKI_URL) {
  const lokiUrl = process.env.LOKI_URL.replace(/\/+$/, "");
  const basicAuth =
    process.env.LOKI_BASIC_AUTH ||
    (process.env.LOKI_USERNAME && process.env.LOKI_PASSWORD
      ? Buffer.from(
          `${process.env.LOKI_USERNAME}:${process.env.LOKI_PASSWORD}`,
        ).toString("base64")
      : undefined);

  const parseLabels = (labels?: string) => {
    const result: Record<string, string> = {};
    if (!labels) return result;
    labels.split(",").forEach((kv) => {
      const [k, v] = kv.split("=");
      if (k && v) result[k.trim()] = v.trim();
    });
    return result;
  };

  const staticLabels = parseLabels(process.env.LOKI_LABELS);

  // Add a custom appender using log4js addAppender API. We'll create a named appender that
  // wraps a function which sends logs to Loki.
  appenders.loki = {
    layout: { pattern: "%d %p %c %m", type: "pattern" },
    type: {
      configure: function (config: any, layouts: any) {
        const layout =
          layouts && config && config.layout
            ? layouts.layout(config.layout)
            : undefined;
        return (loggingEvent: any) => {
          try {
            const ts = new Date(loggingEvent.startTime).getTime() * 1_000_000; // ns
            // Compose a simple log message. Use the formatted layout if available.
            const message = layout
              ? layout(loggingEvent)
              : JSON.stringify(loggingEvent.data.slice(1));

            const streamLabels: Record<string, string> = {
              file: loggingEvent.categoryName || "unknown",
              ...staticLabels,
            };

            const payload = {
              streams: [
                {
                  stream: streamLabels,
                  values: [
                    [
                      ts.toString(),
                      typeof message === "string"
                        ? message
                        : JSON.stringify(message),
                    ],
                  ],
                },
              ],
            };

            const headers: Record<string, string> = {
              "Content-Type": "application/json",
            };
            if (basicAuth) headers.Authorization = `Basic ${basicAuth}`;

            // Fire-and-forget POST to Loki. Do not await to avoid blocking logging.
            axios
              .post(`${lokiUrl}/loki/api/v1/push`, payload, { headers })
              .catch(() => {
                // swallow errors - logging should not crash the app
              });
          } catch (err) {
            // swallow any formatter errors
          }
        };
      },
      // identification string for log4js to treat this as a custom type
      type: "loki",
    },
  };
}

configure({
  appenders,
  categories: {
    default: {
      appenders: ["console"].concat(process.env.LOKI_URL ? ["loki"] : []),
      level: environment.logLevel,
    },
  },
  levels: {
    // Custom level for audit logs. A value of 20001 puts it above 'INFO' but below 'WARN'
    // Reference: https://github.com/stritti/log4js/blob/master/log4js/src/main/js/level.js
    AUDIT: { colour: "magenta", value: 20001 },
  },
});

export const shutdownLoggers = () => {
  log4j.shutdown();
};

/**
 * Datatype to hold log context data.
 */
export type LogContext = {
  example?: string;
};

export const createLightweightApplicationLogger = (filename?: string) => {
  const logger = createApplicationLogger(filename);
  logger.setLogContext(undefined);
  return logger;
};

/**
 * Returns a preconfigured logger for this application, capable of supporting additional log levels (AUDIT) and transporting a log context.
 * @param filename The name of the file or class from which the logs are generated.
 * @param request An optional Request.
 * @param response An optional Response.
 * @returns
 */
export const createApplicationLogger = (
  filename?: string,
  _request?: Request,
  _response?: Response,
) => {
  const logger = getLogger(filename);
  let context: LogContext | undefined = {};

  return {
    audit: (message: string, ...args: any[]) => {
      logger.log("AUDIT", context, message, args);
    },
    debug: (message: string | Error, ...args: any[]) => {
      logger.debug(context, message, args);
    },

    error: (message?: string, err?: Error, ...args: any[]) => {
      logger.error(context, message, err, args);
    },
    getLogContext: () => {
      return context;
    },
    info: (message: string, ...args: any[]) => {
      logger.info(context, message, args);
    },
    setLogContext: (newLogContext: LogContext | undefined) => {
      context = newLogContext;
    },
    trace: (message: string | Error, ...args: any[]) => {
      logger.trace(context, message, args);
    },
    warn: (message: string, ...args: any[]) => {
      logger.warn(context, message, args);
    },
  };
};
