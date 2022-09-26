import { AppDataSource } from "~/database/data-source";

export const createConnection = async () => {
  return await AppDataSource.connect();
};