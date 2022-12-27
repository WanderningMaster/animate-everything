import {
  DefaultRequestParam,
  GifAddReactionRequestDto,
  GifCreateRequestDto,
  GifGetAllRequestDto,
  GifResponseDto,
} from "shared/build";
import { GifRepository } from "../port/gif-repository";
import { GifServiceContainer } from "../gif-service-container";
import { castToGifDto } from "./dtos/cast-to-gif-dto";
import { Reaction } from "~/database/entity";
import { castToGifWithReactionDto } from "./dtos/cast-to-gif-with-reaction-dto";

export class GifService {
  private gifRepository: GifRepository;

  constructor({ gifRepository }: GifServiceContainer) {
    this.gifRepository = gifRepository;
  }

  async getAll({ take, skip, userId }: GifGetAllRequestDto): Promise<Array<GifResponseDto & { isLiked: boolean }>> {
    const gifs = await this.gifRepository.getAll({
      take,
      skip,
    });
    console.log({ userId });

    return gifs.map((gif) => castToGifWithReactionDto(userId, gif));
  }

  async getOne({ id }: DefaultRequestParam): Promise<(GifResponseDto & { likeCount: number }) | null> {
    const { gif, likeCount } = await this.gifRepository.getById({
      id,
    });

    if (!gif) {
      return null;
    }

    return {
      ...castToGifDto(gif),
      likeCount,
    };
  }

  async createOne(payload: GifCreateRequestDto): Promise<GifResponseDto> {
    const gif = await this.gifRepository.createOne(payload);

    return gif;
  }

  async addReaction(payload: GifAddReactionRequestDto): Promise<Reaction | undefined | null> {
    const { gif: isGifExists } = await this.gifRepository.getById({
      id: payload.gifId,
    });
    if (!isGifExists) {
      return null;
    }
    const reaction = await this.gifRepository.addReaction(payload);

    return reaction;
  }
}
