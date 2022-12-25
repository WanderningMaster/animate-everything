import { FsService } from "~/services";
import path from "path";
import { CONFIG } from "~/config/config";

export const initStore = async ({ videoId }: { videoId: string }): Promise<void> => {
  const pathToOutput = path.resolve(CONFIG.outputPath, videoId);
  await FsService.createFolder({ path: pathToOutput });
};
