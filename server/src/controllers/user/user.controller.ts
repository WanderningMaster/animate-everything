import {
  DefaultRequestParam,
  HttpCode,
  HttpError,
  JwtPair,
  Pagination,
  UserCreateRequestDto,
  UserResponseDto,
} from "shared/build";
import { FastifyRequest } from "fastify";
import { userService, cloudService } from "~/services/services";

export class UserController {
  public async getAll(request: FastifyRequest): Promise<UserResponseDto[]> {
    const { take, skip } = request.query as Pagination;
    return userService.getAll({
      take,
      skip,
    });
  }

  public async create(request: FastifyRequest): Promise<UserResponseDto> {
    const payload = request.body as UserCreateRequestDto;

    return userService.createOne(payload);
  }

  public async getOne(request: FastifyRequest): Promise<UserResponseDto> {
    const payload = request.params as DefaultRequestParam;
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

  public async signIn(request: FastifyRequest): Promise<UserResponseDto & JwtPair> {
    const payload = request.body as Omit<UserCreateRequestDto, "username">;

    const user = await userService.signIn(payload);

    if (!user) {
      throw new HttpError({
        message: "Wrong email or password",
        status: HttpCode.BAD_REQUEST,
      });
    }

    return user;
  }

  public async signUp(request: FastifyRequest): Promise<UserResponseDto> {
    const payload = request.body as UserCreateRequestDto;

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

  public async refresh(request: FastifyRequest): Promise<JwtPair> {
    const { token } = request.body as { token: string };
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

  //NOTE: only for test purposes
  public async upload(request: FastifyRequest): Promise<string> {
    const { base64Str, dest } = request.body as { base64Str: string; dest: string };

    const signedUrl = await cloudService.upload({
      base64Str,
      dest,
    });

    return signedUrl;
  }
}
