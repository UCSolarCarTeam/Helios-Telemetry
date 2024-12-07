/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response } from "express";
import log4j, { configure, getLogger, levels } from "log4js";

import { environment } from "@/utils/constants";

type logContent = {
  message: string;
  stack: string | undefined;
};

configure({
  appenders: {
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
  },
  categories: {
    default: { appenders: ["console"], level: environment.logLevel },
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
