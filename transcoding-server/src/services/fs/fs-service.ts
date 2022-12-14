import { mkdir, rm, writeFile, readFile } from "node:fs/promises";
import { logger } from "~/config/logger";

export class FsService {
  public static async createFolder({ path }: { path: string }): Promise<void> {
    try {
      await mkdir(path, { recursive: true });
    } catch (err) {
      logger.error(err);
    }
  }

  public static async removeFolder(path: string): Promise<void> {
    try {
      await rm(path, { recursive: true, force: true }); // rm -rf equivalent
    } catch (err) {
      logger.error(err);
    }
  }

  public static async createFile({
    path,
    filename,
    content,
  }: {
    path: string;
    filename: string;
    content: string[];
  }): Promise<void> {
    try {
      await writeFile(`${path}/${filename}`, content.join("\r\n"));
    } catch (err) {
      logger.error(err);
    }
  }

  public static async replaceInFile({
    path,
    replace,
    text,
  }: {
    path: string;
    replace: string;
    text: string;
  }): Promise<void> {
    const content = await readFile(path);
    const replaced = content.toString("utf-8").replace(replace, text);

    await writeFile(path, replaced);
  }
}
