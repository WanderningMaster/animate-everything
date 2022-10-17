import { DeleteResult, Repository } from "typeorm";
import { Token, User } from "~/database/entity";
import { TokenRepository } from "~/services/token/port/token-repository";
import { DefaultRequestParam } from "shared/build";
import { generateJwt } from "~/utils/generate-jwt";
import { CONFIG } from "~/configuration/config";
import { verifyJwt } from "~/utils/utils";

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

  async getUserByToken({ refreshToken }: { refreshToken: string }): Promise<User | null> {
    try {
      const payload = await verifyJwt<{ id: string }>({
        jwt: refreshToken,
        secret: CONFIG.APP.enscryption.REFRESH_TOKEN_SECRET,
      });

      const token = await this.dataSource.findOne({
        where: {
          userId: payload.id,
        },
        relations: {
          user: true,
        },
      });

      if (!token) {
        return null;
      }

      if (refreshToken !== token.refreshToken) {
        return null;
      }

      return token.user;
    } catch {
      return null;
    }
  }
}