import { AppDataSource } from "~/database/data-source";
import { DataSource } from "typeorm";

export const connect = async (): Promise<DataSource> => {
  return AppDataSource.initialize();
};