import { UserRepository } from "~/services/user/port/user-repository";
import { TokenRepository } from "~/services/token/port/token-repository";

export interface UserServiceContainer {
  userRepository: UserRepository;
  tokenRepository: TokenRepository;
}