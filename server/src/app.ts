import Fastify, { FastifyInstance } from "fastify";
import { logger } from "~/configuration/logger";
import { gracefulShutdownPlugin, healcheckPlugin } from "~/plugins/plugins";
import { connect } from "~/database/connection";
import { routes } from "~/routes/routes";

class Application {

  public async initialize(): Promise<FastifyInstance> {

    const instance = Fastify({
      logger,
    });
    await this.initDb(instance);
    this.initPlugins(instance);
    this.initRoutes(instance);

    //TODO: scaffold middlewares, handlers and other stuff...
    return instance;
  }

  public initPlugins(instance: FastifyInstance): void {
    instance.register(healcheckPlugin);
    instance.register(gracefulShutdownPlugin);
  }

  public async initDb(instance: FastifyInstance): Promise<void> {
    try {
      await connect();
      instance.log.info("DB successfully connected");
    } catch (err) {
      instance.log.error(err, "DB initialization error");
      process.exit(0);
    }
  }

  public initRoutes(instance: FastifyInstance): void {
    for (const { router, prefix } of routes) {
      instance.register(router, {
        prefix,
      });
    }
  }
}

export const application = new Application();