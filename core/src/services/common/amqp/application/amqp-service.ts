import { Channel, Connection } from "amqplib";
import { AmqpConsumeDto, AmqpQueue, AmqpSendToQueueDto } from "shared/build";
import { logger } from "~/configuration/logger";
import { tryConnect } from "~/configuration/amqp-connection";

export class AmqpService {
  public amqpChannel!: Channel;

  async connect(): Promise<void> {
    logger.info("Connecting to Rabbitmq...");
    const connection: Connection = await tryConnect();

    const amqpChannel = await connection.createChannel();

    await this.initQueues(amqpChannel);

    this.amqpChannel = amqpChannel;
  }

  async initQueues(amqpChannel: Channel): Promise<void> {
    await Promise.all([amqpChannel.assertQueue(AmqpQueue.VIDEO_INPUT), amqpChannel.assertQueue(AmqpQueue.GIF_OUTPUT)]);
  }

  async sendToQueue({ queue, content, options }: AmqpSendToQueueDto): Promise<boolean> {
    return this.amqpChannel.sendToQueue(queue, content, options);
  }

  async consume({ queue, onMessage, options }: AmqpConsumeDto): Promise<void> {
    await this.amqpChannel.consume(
      queue,
      (msg) => {
        if (msg) {
          this.amqpChannel.ack(msg);
          onMessage(msg.content);
        }
      },
      options,
    );
  }
}
