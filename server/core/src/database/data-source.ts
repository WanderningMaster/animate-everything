import "reflect-metadata";
import { DataSource } from "typeorm";
import { CONFIG } from "~/configuration/config";
import { Gif, Token, User } from "~/database/entity";
import { Reaction } from "./entity/reaction.entity";

const { DB: config } = CONFIG;

export const AppDataSource = new DataSource({
  name: "default",
  type: "mysql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Token, Gif, Reaction],
  migrations: [],
  subscribers: [],
});
