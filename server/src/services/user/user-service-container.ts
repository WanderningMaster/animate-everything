import { UserRepository } from "~/services/user/port/user-repository";

export interface UserServiceContainer {
  userRepository: UserRepository;
}