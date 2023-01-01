import { Gif } from "~/database/entity";
import { GifResponseDto } from "shared/build";
import { castToUserDto } from "~/services/user/application/dtos";

export const castToGifDto = ({ id, title, mediaSrc, author }: Gif): GifResponseDto => {
  return {
    id,
    title,
    mediaSrc,
    author: castToUserDto(author),
  };
};
