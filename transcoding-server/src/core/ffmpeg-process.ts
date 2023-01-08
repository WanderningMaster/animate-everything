import Ffmpeg from "fluent-ffmpeg";
import { FfmpegFactory } from "~/factories";
import { AmqpService } from "~/services";

export const createProcess = async (
  input: string,
  videoId: string,
  amqpService: AmqpService,
  crop: { left: number; right: number },
): Promise<Ffmpeg.FfmpegCommand> => {
  return FfmpegFactory.create({
    input,
    videoId,
    amqpService,
    crop,
  });
};
