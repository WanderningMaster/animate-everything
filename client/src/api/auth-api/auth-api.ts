import { JwtPair, UserCreateRequestDto, UserResponseDto, QueryKeys } from "shared/build";
import { _localStorage, authService } from "services/services";
import { UseMutateAsyncFunction, UseMutateFunction, useMutation, useQuery } from "react-query";

export const useSignIn = (): {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  userWithToken: (UserResponseDto & JwtPair) | undefined;
  mutateAsync: UseMutateFunction<UserResponseDto & JwtPair, unknown, Omit<UserCreateRequestDto, "username">>;
} => {
  const fetcher = (payload: Omit<UserCreateRequestDto, "username">): Promise<UserResponseDto & JwtPair> =>
    authService.signIn(payload);
  const {
    isError,
    isLoading,
    isSuccess,
    data: userWithToken,
    mutateAsync,
  } = useMutation([QueryKeys.AUTH, QueryKeys.USER], fetcher, {
    onSuccess: (data) => {
      _localStorage.save("accessToken", data.accessToken);
      _localStorage.save("refreshToken", data.refreshToken);
    },
  });

  return {
    isError,
    isLoading,
    isSuccess,
    userWithToken,
    mutateAsync,
  };
};

export const useSignOut = (): {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean | undefined;
  mutateAsync: UseMutateAsyncFunction<boolean, unknown, void, unknown>;
} => {
  const fetcher = (): Promise<boolean> => authService.signOut();

  const { isError, isLoading, isSuccess, mutateAsync } = useMutation([QueryKeys.AUTH, QueryKeys.USER], fetcher, {
    onSuccess: () => {
      _localStorage.remove("accessToken");
      _localStorage.remove("refreshToken");
    },
  });

  return {
    isError,
    isLoading,
    isSuccess,
    mutateAsync,
  };
};

export const useSignUp = (): {
  isError: boolean;
  isLoading: boolean;
  user: UserResponseDto | undefined;
  isSuccess: boolean;
  mutateAsync: UseMutateAsyncFunction<UserResponseDto, unknown, UserCreateRequestDto, unknown>;
} => {
  const fetcher = (payload: UserCreateRequestDto): Promise<UserResponseDto> => authService.signUp(payload);

  const {
    isError,
    isLoading,
    isSuccess,
    mutateAsync,
    data: user,
  } = useMutation([QueryKeys.AUTH, QueryKeys.USER], fetcher);

  return {
    isError,
    isLoading,
    isSuccess,
    mutateAsync,
    user,
  };
};

export const useMe = (): {
  isError: boolean;
  isFetched: boolean;
  isAuth: boolean;
  isLoading: boolean;
  user: UserResponseDto | undefined;
} => {
  const fetcher = (): Promise<UserResponseDto> => authService.me();
  const { isError, isFetched, isSuccess, isLoading, data: user } = useQuery([QueryKeys.USER], fetcher);

  return {
    isError,
    isFetched,
    isAuth: isSuccess && user ? true : false,
    isLoading,
    user,
  };
};
