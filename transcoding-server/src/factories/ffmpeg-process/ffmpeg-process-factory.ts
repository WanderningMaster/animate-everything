/* eslint-disable @typescript-eslint/quotes */
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
      .complexFilter([
        {
          filter: "fps",
          inputs: "[0:v]",
          outputs: "[vid]",
          options: "12",
        },
        {
          filter: "scale",
          inputs: "[vid]",
          options: { w: "480", h: "-1" },
          outputs: "[vid]",
        },
        {
          inputs: "[vid]",
          filter: "split",
          outputs: "[a][b]",
        },
        {
          filter: "palettegen",
          inputs: "[a]",
          outputs: "[p]",
        },
        {
          filter: "paletteuse",
          inputs: "[b][p]",
        },
      ])
      .output(path.resolve(CONFIG.outputPath, videoId, "output.gif"))
      .on("start", (command) => logger.info("ffmpeg started\n", command))
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

  public static createPallete({ videoId, input }: FffmpegProcessCreatorDto): Promise<void> {
    Ffmpeg.setFfmpegPath(CONFIG.ffmpegPath);
    return new Promise((resolve, reject) => {
      Ffmpeg(input)
        .addOption("-hide_banner")
        .addOption("-vf", "palettegen")
        .output(path.resolve(CONFIG.outputPath, videoId, "pallete.png"))
        .on("start", () => logger.info("ffmpeg started"))
        .on("end", () => {
          logger.info("pallete created");
          resolve();
        })
        .on("stderr", function (stderrLine) {
          logger.error("Stderr output: " + stderrLine);
        })
        .on("error", (err) => {
          logger.error(err);
          reject(err);
        })
        .run();
    });
  }
}
