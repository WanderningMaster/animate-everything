type ImageUploadRequestDto = {
  base64Str: string;
  type: "temp" | "gif" | "avatar";
};

export { type ImageUploadRequestDto };
