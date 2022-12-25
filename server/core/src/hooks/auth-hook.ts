import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { HttpCode, HttpError } from "shared/build";
import { verifyJwt } from "~/utils/utils";
import { CONFIG } from "~/configuration/config";

export const authHook = async (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): Promise<void> => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new HttpError({
      message: "Unauthorized error",
      status: HttpCode.UNAUTHORIZED,
    });
  }
  const token = getBearerTokenFromAuthHeader(authHeader);
  if (!token) {
    throw new HttpError({
      message: "Unauthorized error",
      status: HttpCode.UNAUTHORIZED,
    });
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

  done();
};

const getBearerTokenFromAuthHeader = (authHeader: string): string => {
  const bearerToken: string | undefined = authHeader.split(" ")[1];
  return bearerToken || "";
};