import { CONFIG } from "~/configuration/config";
import { FastifyInstance } from "fastify";
import { application } from "~/app";

export class Server {
  private instance: FastifyInstance | undefined;
  public port: number;
  public host: string;

  constructor() {
    this.port = CONFIG.APP.PORT;
    this.host = CONFIG.APP.HOST;
  }

  async run(): Promise<void> {
    try {
      this.instance = await application.initialize();

      this.instance.listen({ port: this.port, host: this.host }, (err) => {
        if (err) {
          this.instance?.log.error(err);
        }

        this.instance?.log.info(`Environment: ${CONFIG.APP.NODE_ENV}`);
      });
    } catch (error) {
      this.instance?.log.error(error, "Application initialization error");
    }
  }
}

const server = new Server();

server.run();