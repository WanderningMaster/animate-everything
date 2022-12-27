import { DefaultRequestParam, GifAddReactionRequestDto, GifCreateRequestDto, GifGetAllRequestDto } from "shared/build";
import { Gif, Reaction } from "~/database/entity";

export interface GifRepository {
  getAll({ take, skip }: GifGetAllRequestDto): Promise<Gif[]>;

  getById({ id }: DefaultRequestParam): Promise<{ gif: Gif | null; likeCount: number }>;

  createOne(payload: GifCreateRequestDto): Promise<Gif>;

  addReaction({ authorId, gifId }: GifAddReactionRequestDto): Promise<Reaction | undefined>;
}
