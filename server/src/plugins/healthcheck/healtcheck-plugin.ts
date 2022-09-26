import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ApiPath } from "shared/build";
import { CONFIG } from "~/configuration/config";

export async function healcheckPlugin(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  fastify.get(`${CONFIG.APP.API_BASE_PREFIX}${ApiPath.HEALTHCHECK}`, async (req, reply) => {
    reply.status(200);
    return {
      status: "healthy",
    };
  });
}