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
} => {
  const { user: data, isLoading, signInAsync, signOutAsync } = useContext(AuthContext);

  return {
    data,
    isAuth: Boolean(data),
    isLoading,
    signInAsync,
    signOutAsync,
  };
};
