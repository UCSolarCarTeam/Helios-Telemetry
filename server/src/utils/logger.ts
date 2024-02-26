import { type Request, type Response } from "express";
import log4j, { configure, getLogger, levels } from "log4js";

import { environment } from "@/utils/constants";

type logContent = {
  message: string;
  stack: string | undefined;
};

configure({
  levels: {
    // Custom level for audit logs. A value of 20001 puts it above 'INFO' but below 'WARN'
    // Reference: https://github.com/stritti/log4js/blob/master/log4js/src/main/js/level.js
    AUDIT: { value: 20001, colour: "magenta" },
  },
  appenders: {
    console: {
      type: "stdout",
      layout: {
        // Documentation: https://log4js-node.github.io/log4js-node/layouts.html
        type: "pattern",
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
              const logContent: Array<logContent | string> = [];

              logEvent.data.slice(1, logEvent.data.length).forEach((data) => {
                if (data !== undefined) {
                  if (
                    data instanceof Error &&
                    logEvent.level === levels.ERROR
                  ) {
                    if (logErrorStack === "true") {
                      logContent.push({
                        message: data.message,
                        stack: data.stack,
                      });
                    } else {
                      logContent.push(data.message);
                    }
                  } else if (Array.isArray(data) && data.length > 0) {
                    logContent.push(...(data as Array<logContent | string>));
                  }
                }
              });
              if (logContent.length === 1) {
                return JSON.stringify(logContent[0]);
              } else {
                return JSON.stringify(logContent);
              }
            }
            return JSON.stringify(logEvent.data);
          },
        },
      },
    },
    dateFile: {
      type: "dateFile",
      filename: `${environment.logDir}/${environment.logFile}`,
      layout: { type: "basic" },
      compress: true,
      daysToKeep: 14,
      keepFileExt: true,
    },
  },
  categories: {
    default: { appenders: ["console"], level: environment.logLevel },
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
  logger.setLogContext({});
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
  let context: LogContext = {};

  return {
    getLogContext: () => {
      return context;
    },
    setLogContext: (newLogContext: LogContext) => {
      context = newLogContext;
    },

    trace: (message: string | Error, ...args: any[]) => {
      logger.trace(context, message, args);
    },
    debug: (message: string | Error, ...args: any[]) => {
      logger.debug(context, message, args);
    },
    info: (message: string, ...args: any[]) => {
      logger.info(context, message, args);
    },
    audit: (message: string, ...args: any[]) => {
      logger.log("AUDIT", context, message, args);
    },
    warn: (message: string, ...args: any[]) => {
      logger.warn(context, message, args);
    },
    error: (message?: string, err?: Error, ...args: any[]) => {
      logger.error(context, message, err, args);
    },
  };
};
