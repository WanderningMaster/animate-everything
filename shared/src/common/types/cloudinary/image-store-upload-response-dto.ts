import { UploadApiResponse } from "cloudinary";

type ImageUploadResponseDto = Pick<UploadApiResponse, "url" | "format">;

export { type ImageUploadResponseDto };
