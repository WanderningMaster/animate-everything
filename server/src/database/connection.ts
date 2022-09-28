import { AppDataSource } from "~/database/data-source";

export const connect = async () => {
  return await AppDataSource.initialize();
};