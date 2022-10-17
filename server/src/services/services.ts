import { UserServiceContainer } from "~/services/user/user-service-container";
import { UserRepositoryAdapter } from "~/repositories/user/user-repository-adapter";
import { AppDataSource } from "~/database/data-source";
import { Token, User } from "~/database/entity";
import { UserService } from "~/services/user/application/user-service";
import { TokenRepositoryAdapter } from "~/repositories/token/token-repository-adapter";

const userServiceContainer: UserServiceContainer = {
  userRepository: new UserRepositoryAdapter(AppDataSource.getRepository(User)),
  tokenRepository: new TokenRepositoryAdapter(AppDataSource.getRepository(Token)),
};
const userService = new UserService(userServiceContainer);

export {
  userService,
  userServiceContainer,
};