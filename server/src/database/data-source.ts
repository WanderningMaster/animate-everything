import "reflect-metadata";
import { DataSource } from "typeorm";
import { CONFIG } from "~/configuration/config";
import { Token, User } from "~/database/entity";

const { DB: config } = CONFIG;

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Token],
  migrations: [],
  subscribers: [],
});

