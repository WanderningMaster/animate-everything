type UserUpdateRequestDto = Partial<{
  email: string;
  username: string;
  isPrivate: boolean;
}>;

export { UserUpdateRequestDto };
