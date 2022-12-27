import { FastifyRequest } from "fastify";
import { HttpCode, HttpError } from "shared/build";
import { verifyJwt } from "~/utils/utils";
import { CONFIG } from "~/configuration/config";

export const authHook =
  (isOptional: boolean) =>
  async (request: FastifyRequest): Promise<void> => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      if (!isOptional) {
        throw new HttpError({
          message: "Unauthorized error",
          status: HttpCode.UNAUTHORIZED,
        });
      }
      return;
    }
    const token = getBearerTokenFromAuthHeader(authHeader);
    if (!token) {
      if (!isOptional) {
        throw new HttpError({
          message: "Unauthorized error",
          status: HttpCode.UNAUTHORIZED,
        });
      }
      return;
    }
    try {
      const payload = await verifyJwt<{ id: string }>({
        jwt: token,
        secret: CONFIG.APP.enscryption.ACCESS_TOKEN_SECRET,
      });
      request.user = payload;
    } catch {
      throw new HttpError({
        message: "Unauthorized error",
        status: HttpCode.UNAUTHORIZED,
      });
    }
  };

const getBearerTokenFromAuthHeader = (authHeader: string): string => {
  const bearerToken: string | undefined = authHeader.split(" ")[1];
  return bearerToken || "";
};
