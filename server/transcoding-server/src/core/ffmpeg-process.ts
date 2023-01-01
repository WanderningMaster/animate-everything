import Ffmpeg from "fluent-ffmpeg";
import { FfmpegFactory } from "~/factories";
import { AmqpService } from "~/services";

export const createProcess = (input: string, videoId: string, amqpService: AmqpService): Ffmpeg.FfmpegCommand => {
  return FfmpegFactory.create({
    input,
    videoId,
    amqpService,
  });
};
