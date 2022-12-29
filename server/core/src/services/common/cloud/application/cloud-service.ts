import { Storage } from "firebase-admin/storage";
import { CONFIG } from "~/configuration/config";
import { CloudServiceContainer } from "../cloud-service-container";

export class CloudService {
  private storage: Storage;

  constructor({ storage }: CloudServiceContainer) {
    this.storage = storage;
  }

  public async getDownLoadUrl(dest: string): Promise<string> {
    const url = await this.storage
      .bucket()
      .file(dest)
      .getSignedUrl({
        action: "read",
        expires: CONFIG.CLOUD.CLOUD_SIGNED_URL_EXPIRATION,
      })
      .then((url) => url[0]);

    return url;
  }

  public async upload({ base64Str, dest }: { base64Str: string; dest: string }): Promise<string> {
    const file = this.storage.bucket().file(dest);

    const imageBuff = Buffer.from(base64Str, "base64");
    await file.save(imageBuff);

    const url = await file
      .getSignedUrl({
        action: "read",
        expires: CONFIG.CLOUD.CLOUD_SIGNED_URL_EXPIRATION,
      })
      .then((url) => url[0]);

    return url;
  }
}
