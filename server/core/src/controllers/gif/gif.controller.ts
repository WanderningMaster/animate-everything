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
      Querystring: Pagination & { search?: string };
    }>,
  ): Promise<{
    data: GifResponseDto[];
    itemCount: number;
  }> {
    const { take, skip, search } = request.query;
    const { serializedGifs, itemCount } = await gifService.getAll({
      take,
      skip,
      userId: request?.user?.id,
      search,
    });

    return {
      data: serializedGifs,
      itemCount,
    };
  }

  public async getFavorites(
    request: FastifyRequest<{
      Querystring: Pagination;
    }>,
  ): Promise<{
    data: GifResponseDto[];
    itemCount: number;
  }> {
    const { take, skip } = request.query;
    const { serializedGifs, itemCount } = await gifService.getFavorites({
      take,
      skip,
      userId: request?.user?.id,
    });

    return {
      data: serializedGifs,
      itemCount,
    };
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

    console.log({ payload });

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
    const { id } = request.params;

    const gif = await gifService.getOne({ id, userId: request?.user?.id });
    if (!gif) {
      throw new HttpError({ message: "GifEntity not found", status: HttpCode.NOT_FOUND });
    }

    return gif;
  }

  public async getByAuthorId(
    request: FastifyRequest<{
      Params: DefaultRequestParam;
      Querystring: Pagination;
    }>,
  ): Promise<{
    data: GifResponseDto[];
    itemCount: number;
  }> {
    const { id } = request.params;
    const { take, skip } = request.query;
    const { serializedGifs, itemCount } = await gifService.getByAuthorId({
      take,
      skip,
      userId: request?.user?.id,
      id,
    });

    return {
      data: serializedGifs,
      itemCount,
    };
  }

  public async processVideoAndReturnGif(request: FastifyRequest): Promise<{ res: string }> {
    const file = await request.file();
    if (!file) {
      throw new HttpError({
        message: "File not found",
        status: HttpCode.BAD_REQUEST,
      });
    }
    const ext = file?.mimetype.split("/")[1];
    const base64Str = (await file.toBuffer()).toString("base64");

    const res = await gifService.uploadVideo(`data:video/${ext};base64,` + base64Str);
    return { res };
  }
}
