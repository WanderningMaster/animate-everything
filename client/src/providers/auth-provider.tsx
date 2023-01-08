/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "components/common/typography";
import React, { createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import { UseMutateAsyncFunction, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { authService, userService, _localStorage } from "services/services";
import { QueryKeys, UserResponseDto, UserCreateRequestDto, JwtPair, UserUpdateRequestDto } from "shared/build";
import { toast, Id } from "react-toastify";

interface AuthContextType {
  user?: { me: UserResponseDto };
  isLoading: boolean;
  isLoadingSignIn: boolean;
  isLoadingSignOut: boolean;
  error: string | null;
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
  deleteProfileAsync: UseMutateAsyncFunction<UserResponseDto, unknown, void, unknown>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<{ me: UserResponseDto } | undefined>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const notifyFailedSignIn = (): Id => toast("Invalid credentials", { type: "error" });
  const notifySignIn = (): Id => toast("You successfully signed in", { type: "success" });
  const notifySignOut = (): Id => toast("You successfully signed out", { type: "success" });

  const { isLoading } = useQuery([QueryKeys.USER], () => authService.me(), {
    onSuccess: (data) => {
      setUser({
        me: { id: data.id, email: data.email, username: data.username, privacy: data.privacy, avatar: data.avatar },
      });
    },
  });

  const { mutateAsync: signInAsync, isLoading: isLoadingSignIn } = useMutation(
    [QueryKeys.USER, QueryKeys.AUTH],
    (payload: Omit<UserCreateRequestDto, "username">) => authService.signIn(payload),
    {
      onSuccess: (data) => {
        _localStorage.save("accessToken", data.accessToken);
        _localStorage.save("refreshToken", data.refreshToken);
        setUser({
          me: { id: data.id, email: data.email, username: data.username, privacy: data.privacy, avatar: data.avatar },
        });
        notifySignIn();
        navigate("/");
      },
      onError: (err: any) => {
        notifyFailedSignIn();
        setError(err?.message);
      },
    },
  );

  const { mutateAsync: signOutAsync, isLoading: isLoadingSignOut } = useMutation(
    [QueryKeys.USER, QueryKeys.AUTH],
    () => authService.signOut(),
    {
      onSuccess: () => {
        _localStorage.remove("accessToken");
        _localStorage.remove("refreshToken");
        setUser(undefined);
        navigate("/login");
        notifySignOut();
      },
      onError: (err: any) => {
        setError(err?.message);
      },
    },
  );

  const notifyProfileDeleted = (): Id => toast("Profile successfully deleted", { type: "success" });
  const { mutateAsync: deleteProfileAsync } = useMutation(
    [QueryKeys.USER, QueryKeys.AUTH],
    () => userService.deleteProfile(),
    {
      onSuccess: () => {
        _localStorage.remove("accessToken");
        _localStorage.remove("refreshToken");
        setUser(undefined);
        navigate("/login");
        notifyProfileDeleted();
      },
    },
  );

  const notifyUpdateAvatar = (): Id => toast("Successfully updated avatar", { type: "success" });
  const { mutateAsync: updateAvatarAsync } = useMutation(
    [QueryKeys.USER],
    (payload: FormData) => userService.updateAvatar(payload),
    {
      onSuccess: (data) => {
        if (data) {
          setUser((state) => {
            if (!state) {
              return undefined;
            }
            return {
              me: { ...state?.me, avatar: data.avatar },
            };
          });
          notifyUpdateAvatar();
        }
      },
    },
  );

  const notifyUpdateProfile = (): Id => toast("Successfully updated profile", { type: "success" });
  const { mutateAsync: updateProfileAsync } = useMutation(
    [QueryKeys.USER],
    (payload: UserUpdateRequestDto) => userService.updateProfile(payload),
    {
      onSuccess: (data) => {
        if (data) {
          setUser((state) => {
            if (!state) {
              return undefined;
            }
            return {
              me: { ...state?.me, username: data.username, email: data.avatar, privacy: data.privacy },
            };
          });
          notifyUpdateProfile();
        }
      },
    },
  );

  const memoedData = useMemo(
    () => ({
      user,
      isLoading,
      error,
      isLoadingSignIn,
      isLoadingSignOut,
      signInAsync,
      signOutAsync,
      updateAvatarAsync,
      updateProfileAsync,
      deleteProfileAsync,
    }),
    [
      user,
      isLoading,
      error,
      isLoadingSignIn,
      isLoadingSignOut,
      signInAsync,
      signOutAsync,
      updateAvatarAsync,
      updateProfileAsync,
      deleteProfileAsync,
    ],
  );

  return (
    <AuthContext.Provider value={memoedData}>
      {isLoading ? <Typography text="Loading..." /> : children}
    </AuthContext.Provider>
  );
};
