import { User } from "~/database/entity";
import { UserResponseDto } from "shared/build";

export const castToUserDto = ({ id, username, email }: User): UserResponseDto => {
  return {
    id,
    username,
    email,
  };
};