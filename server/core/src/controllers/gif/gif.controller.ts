import {
  DefaultRequestParam,
  GifCreateRequestDto,
  GifResponseDto,
  HttpCode,
  HttpError,
  Pagination,
} from "shared/build";
import { FastifyRequest } from "fastify";
import { gifService } from "~/services/services";

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
