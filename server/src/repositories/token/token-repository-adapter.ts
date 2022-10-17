import { DeleteResult, Repository } from "typeorm";
import { Token } from "~/database/entity";
import { TokenRepository } from "~/services/token/port/token-repository";
import { DefaultRequestParam } from "shared/build";
import { generateJwt } from "~/utils/generate-jwt";
import { CONFIG } from "~/configuration/config";

export class TokenRepositoryAdapter implements TokenRepository {
  private dataSource: Repository<Token>;

  constructor(dataSource: Repository<Token>) {
    this.dataSource = dataSource;
  }

  async createToken({ id }: DefaultRequestParam): Promise<Token> {
    await this.deleteToken({ id });
    
    const refreshToken = await generateJwt<{ id: string }>({
      payload: { id },
      lifetime: CONFIG.APP.enscryption.REFRESH_TOKEN_LIFETIME,
      secret: CONFIG.APP.enscryption.REFRESH_TOKEN_SECRET,
    });

    return this.dataSource.save({
      refreshToken,
      userId: id,
    });
  }

  deleteToken({ id }: DefaultRequestParam): Promise<DeleteResult> {
    return this.dataSource.delete({ userId: id });
  }
}