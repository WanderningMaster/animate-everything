import { config } from "dotenv";
import { AppEnvironment, LogLevel } from "shared/build";

export type LoggerConfig = {
  LOG_LEVEL: LogLevel;
};

export type AppConfig = {
  API_BASE_PREFIX: string;
  NODE_ENV: AppEnvironment;
  HOST: string;
  PORT: number;
  enscryption: {
    SALT_ROUNDS: number;
  }
};

export type DbConfig = {
  DB_PORT: number;
  DB_HOST: string;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
};

export type Config = {
  APP: AppConfig;
  LOGGER: LoggerConfig;
  DB: DbConfig;
};

const isDevEnvironment = (nodeEnv = ""): boolean => nodeEnv === AppEnvironment.DEVELOPMENT;

const configuration = (): Config => {
  config();

  const {
    API_BASE_PREFIX,
    NODE_ENV, PORT,
    HOST, DB_HOST,
    DB_PORT, DB_USERNAME,
    DB_NAME, DB_PASSWORD,
    SALT_ROUNDS,
  } = process.env;

  return {
    APP: {
      API_BASE_PREFIX: API_BASE_PREFIX || "/api/v1",
      NODE_ENV: NODE_ENV as AppEnvironment || AppEnvironment.DEVELOPMENT,
      HOST: HOST || "localhost",
      PORT: Number(PORT) || 5001,
      enscryption: {
        SALT_ROUNDS: Number(SALT_ROUNDS) || 10,
      },
    },
    LOGGER: {
      LOG_LEVEL: isDevEnvironment(NODE_ENV) ? LogLevel.DEBUG : LogLevel.INFO,
    },
    DB: {
      DB_HOST: DB_HOST || "localhost",
      DB_PORT: Number(DB_PORT) || 5432,
      DB_USERNAME: DB_USERNAME || "",
      DB_NAME: DB_NAME || "",
      DB_PASSWORD: DB_PASSWORD || "",
    },
  };
};

const CONFIG = configuration();

export { CONFIG };