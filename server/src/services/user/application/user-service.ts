import {
  DefaultRequestParam,
  JwtPair,
  UserCreateRequestDto,
  UserGetAllRequestDto,
  UserResponseDto,
} from "shared/build";
import { castToUserDto } from "~/services/user/application/dtos";
import { UserServiceContainer } from "~/services/user/user-service-container";
import { UserRepository } from "~/services/user/port/user-repository";
import { TokenRepository } from "~/services/token/port/token-repository";
import { compareHash, generateJwt } from "~/utils/utils";
import { CONFIG } from "~/configuration/config";

export class UserService {
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;

  constructor({ userRepository, tokenRepository }: UserServiceContainer) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
  }

  async getAll({ take, skip }: UserGetAllRequestDto): Promise<UserResponseDto[]> {
    const users = await this.userRepository.getAll({
      take,
      skip,
    });

    return users.map((user) => castToUserDto(user));
  }

  async getOne({ id }: DefaultRequestParam): Promise<UserResponseDto | null> {
    const user = await this.userRepository.getById({
      id,
    });

    if (!user) {
      return null;
    }

    return castToUserDto(user);
  }

  async createOne(payload: UserCreateRequestDto): Promise<UserResponseDto> {
    const user = await this.userRepository.createOne(payload);

    return castToUserDto(user);
  }

  async signIn({
                 email,
                 password: passwordToCompare,
               }: Omit<UserCreateRequestDto, "username">): Promise<UserResponseDto & JwtPair | null> {
    const createdUser = await this.userRepository.getByEmailOrUsername({
      email,
    });

    if (!createdUser) {
      return null;
    }

    const { id, password: hashedPassword } = createdUser;

    const isPasswordMatch = await compareHash(passwordToCompare, hashedPassword);
    if (!isPasswordMatch) {
      return null;
    }

    const { refreshToken } = await this.tokenRepository.createToken({
      id,
    });

    const accessToken = await generateJwt<{ id: string }>({
      payload: { id },
      lifetime: CONFIG.APP.enscryption.ACCESS_TOKEN_LIFETIME,
      secret: CONFIG.APP.enscryption.ACCESS_TOKEN_SECRET,
    });

    return {
      ...castToUserDto(createdUser),
      accessToken,
      refreshToken,
    };
  }

  async signUp(payload: UserCreateRequestDto): Promise<UserResponseDto | null> {

    const alreadyCreatedUser = await this.userRepository.getByEmailOrUsername({
      email: payload.email,
      username: payload.username,
    });
    if (alreadyCreatedUser) {
      return null;
    }

    return this.createOne(payload);
  }
}