import { CONFIG } from "./config";
import { connect, Connection } from "amqplib";
import { logger } from "./logger";
import { geometricProgressionByIndex, timeout } from "~/utils/utils";
import { AMQP_CONNECTION_TRIES, AmqpConnectionError } from "shared/build";

export const tryConnect = async (tries = 1): Promise<Connection> => {
  const amqpServer = CONFIG.APP.RABBITMQ_URL;

  if (tries >= AMQP_CONNECTION_TRIES) {
    throw new AmqpConnectionError();
  }

  try {
    logger.info(`Trying to connect... Attempt ${tries}`);

    const connection = await connect(amqpServer);

    logger.info("Connect to RabbitMQ success!");

    return connection;
  } catch {
    await timeout(geometricProgressionByIndex(2, tries, 0.5) * 1000);

    return tryConnect(++tries);
  }
};
