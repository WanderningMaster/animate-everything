import { DefaultRequestParam } from "shared/build";
import { Token } from "~/database/entity";
import { DeleteResult } from "typeorm";

export interface TokenRepository {
  createToken({ id }: DefaultRequestParam): Promise<Token>;

  deleteToken({ id }: DefaultRequestParam): Promise<DeleteResult>;
}