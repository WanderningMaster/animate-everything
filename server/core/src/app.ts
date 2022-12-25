import Fastify, { FastifyInstance } from "fastify";
import { logger } from "~/configuration/logger";
import { gracefulShutdownPlugin, healcheckPlugin } from "~/plugins/plugins";
import corsPlugin from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import { connect } from "~/database/connection";
import { routes } from "~/routes/routes";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { swaggerOpts } from "~/configuration/swagger-conf";
import { amqpService } from "./services/services";

class Application {
  public async initialize(): Promise<FastifyInstance> {
    const instance = Fastify({
      logger,
    });
    await this.initDb(instance);
    await this.initAmqp(instance);
    this.initPlugins(instance);
    await this.initSwagger(instance);
    this.initRoutes(instance);
    await instance.ready();
    instance.swagger();

    //TODO: scaffold middlewares, handlers and other stuff...
    return instance;
  }

  public initPlugins(instance: FastifyInstance): void {
    instance.register(healcheckPlugin);
    instance.register(gracefulShutdownPlugin);
    instance.register(corsPlugin, {
      origin: "*",
      methods: ["GET", "PUT", "POST"],
    });
  }

  public async initSwagger(instance: FastifyInstance): Promise<void> {
    await instance.register(fastifySwagger, {
      swagger: {
        info: {
          title: "Animate-Everything API documentation",
          version: "0.1.0",
        },
        securityDefinitions: {
          Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
          },
        },
      },
    });
    await instance.register(fastifySwaggerUi, swaggerOpts);
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

  public async initAmqp(instance: FastifyInstance): Promise<void> {
    try {
      await amqpService.connect();
      instance.log.info("AMQP successfully connected");
    } catch (err) {
      instance.log.error(err, "AMQP initialization error");
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
