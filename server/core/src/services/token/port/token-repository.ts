import { DefaultRequestParam } from "shared/build";
import { Token, User } from "~/database/entity";
import { DeleteResult } from "typeorm";

export interface TokenRepository {
  createToken({ id }: DefaultRequestParam): Promise<Token>;

  deleteToken({ id }: DefaultRequestParam): Promise<DeleteResult>;
  
  getUserByToken({ refreshToken }: { refreshToken: string }): Promise<User | null>;
}