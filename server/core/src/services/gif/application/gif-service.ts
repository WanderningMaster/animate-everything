import {
  AmqpQueue,
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
import { CloudService } from "~/services/common/cloud/application/cloud-service";
import { AmqpService } from "~/services/common/amqp/application/amqp-service";
import { amqpService, eventEmitter } from "~/services/services";
import { logger } from "~/configuration/logger";
import { genUUID } from "~/utils/generate-uuid";

export class GifService {
  private gifRepository: GifRepository;
  private cloudService: CloudService;
  private amqpService: AmqpService;

  constructor({ gifRepository, cloudService, amqpService }: GifServiceContainer) {
    this.gifRepository = gifRepository;
    this.cloudService = cloudService;
    this.amqpService = amqpService;
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

  async uploadVideo(data: string): Promise<string> {
    const id = genUUID();
    const input = await this.cloudService.upload({
      base64Str: data,
      dest: `temp/${id}.mp4`,
    });
    await amqpService.sendToQueue({
      queue: AmqpQueue.VIDEO_INPUT,
      content: Buffer.from(
        JSON.stringify({
          input,
          videoId: id,
        }),
      ),
    });
    await new Promise((resolve) => eventEmitter.once(`${id}`, resolve));
    const url = await this.cloudService.getDownLoadUrl(`gif/${id}.gif`);
    logger.info({ url });

    return url;
  }
}
