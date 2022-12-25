import { FastifyInstance } from "fastify";
import { ApiPath } from "shared/build";
import { CONFIG } from "~/configuration/config";

export async function healcheckPlugin(fastify: FastifyInstance): Promise<void> {
  fastify.get(`${CONFIG.APP.API_BASE_PREFIX}${ApiPath.HEALTHCHECK}`, async (req, reply) => {
    reply.status(200);
    return {
      status: "healthy",
    };
  });
}