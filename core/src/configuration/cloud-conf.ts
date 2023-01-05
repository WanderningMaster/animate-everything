import { CloudinaryApi } from "shared/build";
import { v2 as cloudinary } from "cloudinary";
import { CONFIG } from "./config";

const uploadPresets = (cloudinary: CloudinaryApi): void => {
  cloudinary.api.create_upload_preset({
    name: "temp",
    folder: "temp",
  });
  cloudinary.api.create_upload_preset({
    name: "gif",
    folder: "gif",
  });
  cloudinary.api.create_upload_preset({
    name: "avatar",
    folder: "avatar",
  });
};

export const initCloud = (): CloudinaryApi => {
  const { CLOUD } = CONFIG;
  cloudinary.config({
    cloud_name: CLOUD.CLOUDINARY_NAME,
    api_key: CLOUD.CLOUDINARY_API_KEY,
    api_secret: CLOUD.CLOUDINARY_API_SECRET,
    secure: true,
  });
  uploadPresets(cloudinary);

  return cloudinary;
};
