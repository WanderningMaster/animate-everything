import { DefaultRequestParam, UserCreateRequestDto, UserGetAllRequestDto, UserUpdateRequestDto } from "shared/build";
import { User } from "~/database/entity";

export interface UserRepository {
  getAll({ take, skip }: UserGetAllRequestDto): Promise<User[]>;

  getById({ id }: DefaultRequestParam): Promise<User | null>;

  getByEmailOrUsername({ email, username }: { email?: string; username?: string }): Promise<User | null>;

  createOne(payload: UserCreateRequestDto): Promise<User>;

  updateProfile(payload: UserUpdateRequestDto & { userId: string }): Promise<User>;

  delete({ id }: DefaultRequestParam): Promise<void>;
}
