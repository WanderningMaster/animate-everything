import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { AppEnvironment } from "shared/build";
import { CONFIG } from "~/configuration/config";

export async function gracefulShutdownPlugin(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  if (CONFIG.APP.NODE_ENV === AppEnvironment.PRODUCTION) {
    ["SIGINT", "SIGTERM"].map((signal) => {
      process.on(signal, () => {
        fastify
          .close()
          .then((err) => {
            fastify.log.info(`Application closed on ${signal} signal`);
            process.exit(0);
          })
          .catch((err) => {
            fastify.log.error(`${err}, Application closed on ${signal} signal`);
            process.exit(1);
          });
      });
    });
  }
}