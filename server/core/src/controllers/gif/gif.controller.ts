import {
  DefaultRequestParam,
  GifAddReactionRequestDto,
  GifCreateRequestDto,
  GifResponseDto,
  HttpCode,
  HttpError,
  Pagination,
} from "shared/build";
import { FastifyReply, FastifyRequest } from "fastify";
import { gifService } from "~/services/services";
import { Reaction } from "~/database/entity";

export class GifController {
  public async getAll(
    request: FastifyRequest<{
      Querystring: Pagination;
    }>,
  ): Promise<GifResponseDto[]> {
    const { take, skip } = request.query;
    return gifService.getAll({
      take,
      skip,
      userId: request?.user?.id,
    });
  }

  public async create(
    request: FastifyRequest<{
      Body: Omit<GifCreateRequestDto, "authorId">;
    }>,
  ): Promise<GifResponseDto> {
    const payload = request.body;
    const { id } = request.user;

    return gifService.createOne({ authorId: id, ...payload });
  }

  public async addReaction(
    request: FastifyRequest<{
      Body: Omit<GifAddReactionRequestDto, "authorId">;
    }>,
    reply: FastifyReply,
  ): Promise<Reaction | undefined> {
    const payload = request.body;
    const { id } = request.user;

    const reaction = await gifService.addReaction({ authorId: id, ...payload });
    if (reaction === null) {
      throw new HttpError({
        message: "Gif not found",
        status: HttpCode.NOT_FOUND,
      });
    }
    if (!reaction) {
      return reply.status(HttpCode.OK).send({ message: "Reaction deleted" });
    }

    return reaction;
  }

  public async getOne(
    request: FastifyRequest<{
      Params: DefaultRequestParam;
    }>,
  ): Promise<GifResponseDto> {
    const payload = request.params;

    const gif = await gifService.getOne(payload);
    if (!gif) {
      throw new HttpError({ message: "GifEntity not found", status: HttpCode.NOT_FOUND });
    }

    return gif;
  }
}
