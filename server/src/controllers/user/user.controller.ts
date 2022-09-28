import { DefaultRequestParam, HttpCode, HttpError, Pagination, UserCreateRequestDto } from "shared/build";
import { FastifyRequest } from "fastify";
import { userService } from "~/services/services";

export class UserController {

  public async getAll(request: FastifyRequest) {
    const { take, skip } = request.query as Pagination;
    return userService.getAll({
      take,
      skip,
    });
  }

  public async create(request: FastifyRequest) {
    const payload = request.body as UserCreateRequestDto;

    return userService.createOne(payload);
  }

  public async getOne(request: FastifyRequest) {
    const payload = request.params as DefaultRequestParam;
    const user = await userService.getOne(payload);
    if (!user) {
      throw new HttpError({ message: "User not found", status: HttpCode.NOT_FOUND });
    }

    return user;
  }
}