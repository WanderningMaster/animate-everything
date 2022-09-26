import { CONFIG } from "./config";
import { Logger, LoggerOptions, pino } from "pino";
import { AppEnvironment } from "shared/build";

function initLogger(): Logger {
  let loggerOptions: LoggerOptions = {
    level: CONFIG.LOGGER.LOG_LEVEL,
  };

  if (CONFIG.APP.NODE_ENV !== AppEnvironment.PRODUCTION) {
    loggerOptions = {
      ...loggerOptions,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: true,
        },
      },
    };
  }

  return pino(loggerOptions);
}

const logger = initLogger();

export { logger };
