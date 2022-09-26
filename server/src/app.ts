import Fastify, { FastifyInstance } from "fastify";
import { logger } from "~/configuration/logger";
import { gracefulShutdownPlugin, healcheckPlugin } from "~/plugins/plugins";
import { createConnection } from "~/database/connection";

class Application {

  public async initialize(): Promise<FastifyInstance> {
    const instance = Fastify({
      logger,
    });
    await this.initPlugins(instance);
    await this.initDb(instance);

    //TODO: scaffold middlewares, handlers and other stuff...
    return instance;
  }

  public async initPlugins(instance: FastifyInstance): Promise<void> {
    await instance.register(healcheckPlugin);
    await instance.register(gracefulShutdownPlugin);
  }

  public async initDb(instance: FastifyInstance): Promise<void> {
    try {
      const connection = await createConnection();
      await instance.register(import("fastify-typeorm-plugin"), {
        connection,
      });
      instance.log.info("DB successfully connected");
    } catch (err) {
      instance.log.error(err, "DB initialization error");
      process.exit(1);
    }
  }
}

export const application = new Application();