import { createProcess } from "./ffmpeg-process";
import Ffmpeg from "fluent-ffmpeg";
import { initStore } from "./init-store";
import { AmqpService } from "~/services";

export const transcode = async (
  input: string,
  videoId: string,
  amqpService: AmqpService,
): Promise<Ffmpeg.FfmpegCommand> => {
  await initStore({ videoId });
  const transcodeProcess = await createProcess(input, videoId, amqpService);
  transcodeProcess.run();
  console.log(transcodeProcess._getArguments());

  return transcodeProcess;
};
