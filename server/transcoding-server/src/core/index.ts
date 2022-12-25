import { createProcess } from "./ffmpeg-process";
import Ffmpeg from "fluent-ffmpeg";
import { initStore } from "./init-store";

export const transcode = async (input: string, videoId: string): Promise<Ffmpeg.FfmpegCommand> => {
  await initStore({ videoId });
  const transcodeProcess = createProcess(input, videoId);
  transcodeProcess.run();
  return transcodeProcess;
};
