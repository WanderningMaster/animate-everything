import { logger } from "~/config/logger";
import { AmqpQueue } from "~/shared";
import { AmqpService } from "~/services/amqp/amqp-service";
import { transcode } from "~/core";

export class ProcessService {
  private amqpService: AmqpService;

  constructor(amqpService: AmqpService) {
    this.amqpService = amqpService;
  }

  public initConsumers(): Promise<void[]> {
    return Promise.all([this.subscribeToStartTranscoding()]);
  }

  private subscribeToStartTranscoding(): Promise<void> {
    return this.amqpService.consume({
      queue: AmqpQueue.VIDEO_INPUT,
      onMessage: async (videoData) => {
        if (!videoData) {
          logger.info("Message data not found");
          return;
        }

        const { input, videoId } = JSON.parse(videoData.toString("utf-8"));
        logger.info({ input, videoId });
        await transcode(input, videoId);
      },
    });
  }
}
