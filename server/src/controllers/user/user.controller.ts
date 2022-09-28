import { Pagination, UserCreateRequestDto } from "shared/build";
import { FastifyRequest } from "fastify";
import { UserService } from "~/services/user/user-service";
import { userService } from "~/services/services";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = userService;
  }

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
}