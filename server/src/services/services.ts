import { UserServiceContainer } from "~/services/user/user-service-container";
import { UserRepositoryAdapter } from "~/repositories/user/user-repository-adapter";
import { AppDataSource } from "~/database/data-source";
import { User } from "~/database/entity";
import { UserService } from "~/services/user/application/user-service";

const userServiceContainer: UserServiceContainer = {
  userRepository: new UserRepositoryAdapter(AppDataSource.getRepository(User)),
};
const userService = new UserService(userServiceContainer);

export {
  userService,
  userServiceContainer,
};