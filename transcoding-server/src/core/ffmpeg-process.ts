import Ffmpeg from "fluent-ffmpeg";
import { FfmpegFactory } from "~/factories";
import { AmqpService } from "~/services";

export const createProcess = async (
  input: string,
  videoId: string,
  amqpService: AmqpService,
): Promise<Ffmpeg.FfmpegCommand> => {
  // await FfmpegFactory.createPallete({
  //   input,
  //   videoId,
  //   amqpService,
  // });
  return FfmpegFactory.create({
    input,
    videoId,
    amqpService,
  });
};
