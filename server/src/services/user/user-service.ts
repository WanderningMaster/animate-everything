import { DefaultRequestParam, UserCreateRequestDto, UserGetAllRequestDto } from "shared/build";
import { User } from "~/database/entity";
import { UserRepository } from "~/repositories/user/user-repository";

export class UserService {
  private repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  async getAll({ take, skip }: UserGetAllRequestDto): Promise<User[]> {
    return this.repo.getAll({
      take,
      skip,
    });
  }

  async getOne({ id }: DefaultRequestParam): Promise<User | null> {
    return this.repo.getById({
      id,
    });
  }

  async createOne(payload: UserCreateRequestDto): Promise<User> {
    return this.repo.createOne(payload);
  }
}