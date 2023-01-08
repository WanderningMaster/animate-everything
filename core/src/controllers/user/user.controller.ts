import {
  DefaultRequestParam,
  HttpCode,
  HttpError,
  JwtPair,
  Pagination,
  UserCreateRequestDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from "shared/build";
import { FastifyRequest } from "fastify";
import { userService, cloudService } from "~/services/services";

export class UserController {
  public async getAll(
    request: FastifyRequest<{
      Querystring: Pagination;
    }>,
  ): Promise<UserResponseDto[]> {
    const { take, skip } = request.query;
    return userService.getAll({
      take,
      skip,
    });
  }

  public async create(
    request: FastifyRequest<{
      Body: UserCreateRequestDto;
    }>,
  ): Promise<UserResponseDto> {
    const payload = request.body;

    return userService.createOne(payload);
  }

  public async getOne(
    request: FastifyRequest<{
      Params: DefaultRequestParam;
    }>,
  ): Promise<UserResponseDto> {
    const payload = request.params;
    const { id } = request.user;
    if (id !== payload.id) {
      throw new HttpError({
        message: "Access denied",
        status: HttpCode.SERVICE_UNAVAILABLE,
      });
    }

    const user = await userService.getOne(payload);
    if (!user) {
      throw new HttpError({ message: "UserEntity not found", status: HttpCode.NOT_FOUND });
    }

    return user;
  }

  public async updateProfile(
    request: FastifyRequest<{
      Body: UserUpdateRequestDto;
    }>,
  ): Promise<UserResponseDto> {
    const payload = request.body;

    const user = await userService.updateProfile({ userId: request.user.id, ...payload });
    if (!user) {
      throw new HttpError({ message: "User not found", status: HttpCode.NOT_FOUND });
    }

    return user;
  }

  public async signIn(
    request: FastifyRequest<{
      Body: Omit<UserCreateRequestDto, "username">;
    }>,
  ): Promise<UserResponseDto & JwtPair> {
    const payload = request.body;

    const user = await userService.signIn(payload);

    if (!user) {
      throw new HttpError({
        message: "Wrong email or password",
        status: HttpCode.BAD_REQUEST,
      });
    }

    return user;
  }

  public async signUp(
    request: FastifyRequest<{
      Body: UserCreateRequestDto;
    }>,
  ): Promise<UserResponseDto> {
    const payload = request.body;

    const user = await userService.signUp(payload);

    if (!user) {
      throw new HttpError({
        message: "User already created",
        status: HttpCode.BAD_REQUEST,
      });
    }

    return user;
  }

  public async signOut(request: FastifyRequest): Promise<boolean> {
    const { id } = request.user;

    const user = await userService.signOut({ id });
    if (!user) {
      throw new HttpError({
        message: "User does not exists",
        status: HttpCode.NOT_FOUND,
      });
    }

    return user;
  }

  public async me(request: FastifyRequest): Promise<UserResponseDto> {
    const { id } = request.user;

    const user = await userService.getOne({
      id,
    });

    if (!user) {
      throw new HttpError({
        message: "User does not exists",
        status: HttpCode.NOT_FOUND,
      });
    }

    return user;
  }

  public async refresh(
    request: FastifyRequest<{
      Body: { token: string };
    }>,
  ): Promise<JwtPair> {
    const { token } = request.body;
    const tokenPair = await userService.refresh({ token });

    if (!tokenPair) {
      throw new HttpError({
        message: "Invalid or expired token",
        status: HttpCode.UNAUTHORIZED,
      });
    }

    return {
      ...tokenPair,
    };
  }

  public async updateAvatar(request: FastifyRequest): Promise<UserResponseDto> {
    const file = await request.file();
    if (!file) {
      throw new HttpError({
        message: "File not found",
        status: HttpCode.BAD_REQUEST,
      });
    }
    const ext = file?.mimetype.split("/")[1];
    const base64Str = (await file.toBuffer()).toString("base64");
    const { id } = request.user;

    const avatar = await cloudService.upload({
      base64Str: `data:image/${ext};base64,${base64Str}`,
      name: `${id}`,
      type: "avatar",
    });

    const user = await userService.updateAvatar({ avatar, userId: id });
    return user;
  }
}
