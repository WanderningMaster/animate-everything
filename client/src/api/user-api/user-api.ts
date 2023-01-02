import { useQuery } from "react-query";
import { userService } from "services/services";
import { UserResponseDto, QueryKeys } from "shared/build";

export const useFetchAllUsers = (): {
  isError: boolean;
  isFetched: boolean;
  isLoading: boolean;
  users: UserResponseDto[] | undefined;
} => {
  const fetcher = (): Promise<UserResponseDto[]> => userService.getAll();
  const { isError, isFetched, isLoading, data: users } = useQuery([QueryKeys.USER], fetcher);

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
  const { isError, isFetched, isLoading, data: user } = useQuery([QueryKeys.USER], fetcher);

  return {
    isError,
    isFetched,
    isLoading,
    user,
  };
};
