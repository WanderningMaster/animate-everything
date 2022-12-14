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
  RABBITMQ_URL: string;
  OUTPUT_PATH: string;
  enscryption: {
    SALT_ROUNDS: number;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_LIFETIME: string;
    REFRESH_TOKEN_LIFETIME: string;
  };
};

export type DbConfig = {
  DB_PORT: number;
  DB_HOST: string;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
};

export type CloundConfig = {
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_NAME: string;
};

export type Config = {
  APP: AppConfig;
  LOGGER: LoggerConfig;
  DB: DbConfig;
  CLOUD: CloundConfig;
};

const isDevEnvironment = (nodeEnv = ""): boolean => nodeEnv === AppEnvironment.DEVELOPMENT;

const configuration = (): Config => {
  config();

  const {
    API_BASE_PREFIX,
    NODE_ENV,
    PORT,
    HOST,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_NAME,
    DB_PASSWORD,
    SALT_ROUNDS,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFETIME,
    REFRESH_TOKEN_LIFETIME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_NAME,
    RABBITMQ_HOST,
    RABBITMQ_PORT,
    OUTPUT_PATH,
  } = process.env;

  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("Missing jwt token secrets");
  }

  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET || !CLOUDINARY_NAME) {
    throw new Error("Missing cloud secrets");
  }

  return {
    APP: {
      API_BASE_PREFIX: API_BASE_PREFIX || "/api/v1",
      NODE_ENV: (NODE_ENV as AppEnvironment) || AppEnvironment.DEVELOPMENT,
      HOST: HOST || "localhost",
      PORT: Number(PORT) || 5001,
      RABBITMQ_URL: `amqp://${RABBITMQ_HOST || "localhost"}:${Number(RABBITMQ_PORT) || 5672}`,
      OUTPUT_PATH: OUTPUT_PATH || "/home/andrii/repo/animate-everything/output/",
      enscryption: {
        SALT_ROUNDS: Number(SALT_ROUNDS) || 10,
        ACCESS_TOKEN_SECRET,
        REFRESH_TOKEN_SECRET,
        ACCESS_TOKEN_LIFETIME: ACCESS_TOKEN_LIFETIME || "30m",
        REFRESH_TOKEN_LIFETIME: REFRESH_TOKEN_LIFETIME || "10d",
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
    CLOUD: {
      CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET,
      CLOUDINARY_NAME,
    },
  };
};

const CONFIG = configuration();

export { CONFIG };
