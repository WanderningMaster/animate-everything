import {} from "~/services/amqp/amqp-service";
import { AmqpQueue, FffmpegProcessCreatorDto } from "~/shared";
import Ffmpeg from "fluent-ffmpeg";
import { logger } from "~/config/logger";
import { CONFIG } from "~/config/config";
import path from "path";

export class FfmpegFactory {
  public static create({ videoId, input, amqpService }: FffmpegProcessCreatorDto): Ffmpeg.FfmpegCommand {
    Ffmpeg.setFfmpegPath(CONFIG.ffmpegPath);
    return Ffmpeg(input)
      .addOption("-hide_banner")
      .addOption("-f", "gif")
      .output(path.resolve(CONFIG.outputPath, videoId, "output.gif"))
      .on("start", () => logger.info("ffmpeg started"))
      .on("end", async () => {
        logger.info("ffmpeg done");
        await amqpService.sendToQueue({
          queue: AmqpQueue.GIF_OUTPUT,
          content: Buffer.from(
            JSON.stringify({
              videoId,
            }),
          ),
        });
      })
      .on("stderr", function (stderrLine) {
        logger.error("Stderr output: " + stderrLine);
      })
      .on("error", (err) => logger.error(err));
  }
}
