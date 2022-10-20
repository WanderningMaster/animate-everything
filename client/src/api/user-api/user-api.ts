import { useQuery } from "react-query";
import { userService } from "services/services";
import { UserResponseDto } from "shared/build";

export enum UserQuery {
  FETCH_ALL = "user/fetch-all",
  FETCH_ONE = "user/fetch-one",
}

export const useFetchAllUsers = (): {
  isError: boolean;
  isFetched: boolean;
  isLoading: boolean;
  users: UserResponseDto[] | undefined;
} => {
  const fetcher = (): Promise<UserResponseDto[]> => userService.getAll();
  const { isError, isFetched, isLoading, data: users } = useQuery(UserQuery.FETCH_ALL, fetcher);

  return {
    isError,
    isFetched,
    isLoading,
    users,
  };
};

export const useFetchOneUser = (
  id: string,
): {
  isError: boolean;
  isFetched: boolean;
  isLoading: boolean;
  user: UserResponseDto | undefined;
} => {
  const fetcher = (): Promise<UserResponseDto> => userService.getOne(id);
  const { isError, isFetched, isLoading, data: user } = useQuery(UserQuery.FETCH_ONE, fetcher);

  return {
    isError,
    isFetched,
    isLoading,
    user,
  };
};
