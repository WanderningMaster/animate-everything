import Ffmpeg from "fluent-ffmpeg";
import { FfmpegFactory } from "~/factories";

export const createProcess = (input: string, videoId: string): Ffmpeg.FfmpegCommand => {
  return FfmpegFactory.create({
    input,
    videoId,
  });
};
