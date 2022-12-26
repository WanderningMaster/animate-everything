import { UserResponseDto } from "../types";

type GifResponseDto = {
  id: string;
  title: string;
  mediaSrc: string;
  author: UserResponseDto;
};

export { GifResponseDto };
