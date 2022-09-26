import "reflect-metadata";
import { Connection } from "typeorm";
import { User } from "./entity";
import { CONFIG } from "~/configuration/config";

const { DB: config } = CONFIG;

export const AppDataSource = new Connection({
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

