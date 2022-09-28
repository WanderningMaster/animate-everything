import { UserService } from "./user/user-service";
import { userRepository } from "~/repositories/repositories";

const userService = new UserService(userRepository);

export { userService };