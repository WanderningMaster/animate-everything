import { FastifyInstance } from "fastify";
import { AppEnvironment } from "shared/build";
import { CONFIG } from "~/configuration/config";

export async function gracefulShutdownPlugin(fastify: FastifyInstance): Promise<void> {
  if (CONFIG.APP.NODE_ENV === AppEnvironment.PRODUCTION) {
    ["SIGINT", "SIGTERM"].map((signal) => {
      process.on(signal, () => {
        fastify
          .close()
          .then(() => {
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
