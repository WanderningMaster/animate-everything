import { User } from "~/database/entity";
import { UserResponseDto } from "shared/build";

export const castToUserDto = ({ id, username, email, avatar, privacy }: User): UserResponseDto => {
  return {
    id,
    username,
    email,
    avatar,
    privacy,
  };
};
