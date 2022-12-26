import { DefaultRequestParam, GifCreateRequestDto, GifGetAllRequestDto, GifResponseDto } from "shared/build";
import { GifRepository } from "../port/gif-repository";
import { GifServiceContainer } from "../gif-service-container";
import { castToGifDto } from "./dtos/cast-to-gif-dto";

export class GifService {
  private gifRepository: GifRepository;

  constructor({ gifRepository }: GifServiceContainer) {
    this.gifRepository = gifRepository;
  }

  async getAll({ take, skip }: GifGetAllRequestDto): Promise<GifResponseDto[]> {
    const gifs = await this.gifRepository.getAll({
      take,
      skip,
    });

    return gifs.map((gif) => castToGifDto(gif));
  }

  async getOne({ id }: DefaultRequestParam): Promise<GifResponseDto | null> {
    const gif = await this.gifRepository.getById({
      id,
    });

    if (!gif) {
      return null;
    }

    return castToGifDto(gif);
  }

  async createOne(payload: GifCreateRequestDto): Promise<GifResponseDto> {
    const gif = await this.gifRepository.createOne(payload);

    return gif;
  }
}
