import { Repository } from "typeorm";
import { User } from "~/database/entity";
import { DefaultRequestParam, UserCreateRequestDto, UserGetAllRequestDto, UserUpdateRequestDto } from "shared/build";
import { hashValue } from "~/utils/utils";
import { UserRepository } from "~/services/user/port/user-repository";

export class UserRepositoryAdapter implements UserRepository {
  private dataSource: Repository<User>;

  constructor(dataSource: Repository<User>) {
    this.dataSource = dataSource;
  }

  public getAll({ take, skip }: UserGetAllRequestDto): Promise<User[]> {
    return this.dataSource.find({
      take,
      skip,
    });
  }

  public getById({ id }: DefaultRequestParam): Promise<User | null> {
    return this.dataSource.findOne({
      where: {
        id,
      },
    });
  }

  public async createOne({ password, ...rest }: UserCreateRequestDto): Promise<User> {
    const hashedPayload = { password: await hashValue(password), ...rest };
    return this.dataSource.save(hashedPayload);
  }

  public async updateProfile({ userId, ...payload }: UserUpdateRequestDto & { userId: string }): Promise<User> {
    await this.dataSource.update(userId, {
      ...payload,
    });
    const updatedUser = (await this.getById({ id: userId })) as User;

    return updatedUser;
  }

  getByEmailOrUsername({ email, username }: { email?: string; username?: string }): Promise<User | null> {
    return this.dataSource.findOne({
      where: [{ email }, { username }],
    });
  }
}
