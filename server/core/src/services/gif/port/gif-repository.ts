import { DefaultRequestParam, GifAddReactionRequestDto, GifCreateRequestDto, GifGetAllRequestDto } from "shared/build";
import { Gif, Reaction } from "~/database/entity";

export interface GifRepository {
  getAll({ take, skip, userId, search }: GifGetAllRequestDto): Promise<Gif[]>;

  getById({ id, userId }: DefaultRequestParam & { userId?: string }): Promise<{ gif: Gif | null; likeCount: number }>;

  createOne(payload: GifCreateRequestDto): Promise<Gif>;

  addReaction({ authorId, gifId }: GifAddReactionRequestDto): Promise<Reaction | undefined>;

  getByAuthor(id: string, userId?: string): Promise<Gif[]>;
}
