import { DefaultRequestParam, GifAddReactionRequestDto, GifCreateRequestDto, GifGetAllRequestDto } from "shared/build";
import { Gif, Reaction } from "~/database/entity";

export interface GifRepository {
  getAll({ take, skip, userId, search }: GifGetAllRequestDto): Promise<{ gif: Gif[] } & { itemCount: number }>;

  getById({ id, userId }: DefaultRequestParam & { userId?: string }): Promise<{ gif: Gif | null; likeCount: number }>;

  createOne(payload: GifCreateRequestDto): Promise<Gif>;

  addReaction({ authorId, gifId }: GifAddReactionRequestDto): Promise<Reaction | undefined>;

  getByAuthor(payload: GifGetAllRequestDto & { id: string }): Promise<{ gif: Gif[] } & { itemCount: number }>;
}
