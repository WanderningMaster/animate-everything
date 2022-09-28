import { DefaultRequestParam, UserCreateRequestDto, UserGetAllRequestDto, UserResponseDto } from "shared/build";
import { castToUserDto } from "~/services/user/application/dtos";
import { UserServiceContainer } from "~/services/user/user-service-container";
import { UserRepository } from "~/services/user/port/user-repository";

export class UserService {
  private userRepository: UserRepository;

  constructor({ userRepository }: UserServiceContainer) {
    this.userRepository = userRepository;
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
}