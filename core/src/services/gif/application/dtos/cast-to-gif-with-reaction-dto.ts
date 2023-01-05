import { Gif } from "~/database/entity";
import { GifResponseDto } from "shared/build";
import { castToUserDto } from "~/services/user/application/dtos";

export const castToGifWithReactionDto = (
  userId: string | undefined,
  { id, title, mediaSrc, author, reactions }: Gif,
): GifResponseDto & { isLiked: boolean } => {
  return {
    id,
    title,
    mediaSrc,
    author: castToUserDto(author),
    isLiked: Boolean(reactions.find((reaction) => reaction.authorId === userId)),
  };
};
