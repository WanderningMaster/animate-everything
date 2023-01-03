import { useContext } from "react";
import { AuthContext } from "providers/auth-provider";
import { JwtPair, UserCreateRequestDto, UserResponseDto } from "shared/build";
import { UseMutateAsyncFunction } from "react-query";

export const useAuth = (): {
  data?: { me: UserResponseDto };
  isLoading: boolean;
  isAuth: boolean;
  signInAsync: UseMutateAsyncFunction<
    UserResponseDto & JwtPair,
    unknown,
    Omit<UserCreateRequestDto, "username">,
    unknown
  >;
  signOutAsync: UseMutateAsyncFunction<boolean, unknown, void, unknown>;
  updateAvatarAsync: UseMutateAsyncFunction<UserResponseDto, unknown, FormData, unknown>;
  updateProfileAsync: UseMutateAsyncFunction<
    UserResponseDto,
    unknown,
    Partial<{
      email: string;
      username: string;
      privacy: boolean;
    }>,
    unknown
  >;
} => {
  const {
    user: data,
    isLoading,
    signInAsync,
    signOutAsync,
    updateAvatarAsync,
    updateProfileAsync,
  } = useContext(AuthContext);

  return {
    data,
    isAuth: Boolean(data),
    isLoading,
    signInAsync,
    signOutAsync,
    updateAvatarAsync,
    updateProfileAsync,
  };
};
