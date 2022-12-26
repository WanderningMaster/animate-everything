import { DefaultRequestParam, GifCreateRequestDto, GifGetAllRequestDto } from "shared/build";
import { Gif } from "~/database/entity";

export interface GifRepository {
  getAll({ take, skip }: GifGetAllRequestDto): Promise<Gif[]>;

  getById({ id }: DefaultRequestParam): Promise<Gif | null>;

  createOne(payload: GifCreateRequestDto): Promise<Gif>;
}
