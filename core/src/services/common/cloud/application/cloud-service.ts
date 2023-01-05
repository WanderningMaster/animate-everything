import { CloudinaryApi } from "shared/build";
import { CloudServiceContainer } from "../cloud-service-container";

export class CloudService {
  private storage: CloudinaryApi;

  constructor({ storage }: CloudServiceContainer) {
    this.storage = storage;
  }

  public async destroy(name: string): Promise<string> {
    const res = await this.storage.uploader.destroy(`temp/${name}`, {
      resource_type: "video",
      invalidate: true,
    });

    return res;
  }

  getGifUrl(name: string): string {
    return `https://res.cloudinary.com/ds5b5u8go/image/upload/v1672868102/gif/${name}.gif`;
  }

  public async uploadLarge({
    base64Str,
    type,
    name,
  }: {
    base64Str: string;
    type: "avatar" | "temp" | "gif";
    name: string;
  }): Promise<string> {
    const apiResponse = await this.storage.uploader.upload_large(base64Str, {
      upload_preset: type,
      public_id: `${name}`,
      resource_type: type === "temp" ? "video" : "image",
    });

    return apiResponse.url;
  }

  public async upload({
    base64Str,
    type,
    name,
  }: {
    base64Str: string;
    type: "avatar" | "temp" | "gif";
    name: string;
  }): Promise<string> {
    const apiResponse = await this.storage.uploader.upload(base64Str, {
      upload_preset: type,
      public_id: `${name}`,
      resource_type: type === "temp" ? "video" : "image",
    });

    return apiResponse.url;
  }
}
