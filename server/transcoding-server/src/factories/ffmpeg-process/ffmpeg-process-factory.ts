import { FffmpegProcessCreatorDto } from "~/shared";
import Ffmpeg from "fluent-ffmpeg";
import { logger } from "~/config/logger";
import { CONFIG } from "~/config/config";
import path from "path";

export class FfmpegFactory {
  public static create({ videoId, input }: FffmpegProcessCreatorDto): Ffmpeg.FfmpegCommand {
    Ffmpeg.setFfmpegPath(CONFIG.ffmpegPath);
    return Ffmpeg(input)
      .addOption("-hide_banner")
      .addOption("-f", "gif")
      .output(path.resolve(CONFIG.outputPath, videoId, `${videoId}.gif`))
      .on("start", () => logger.info("ffmpeg started"))
      .on("end", () => logger.info("ffmpeg done"))
      .on("stderr", function (stderrLine) {
        logger.error("Stderr output: " + stderrLine);
      })
      .on("error", (err) => logger.error(err));
  }
}
