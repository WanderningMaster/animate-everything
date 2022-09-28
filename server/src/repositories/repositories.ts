import { UserRepository } from "./user/user-repository";
import { AppDataSource } from "~/database/data-source";
import { User } from "~/database/entity";

export const userRepository = new UserRepository(AppDataSource.getRepository(User));