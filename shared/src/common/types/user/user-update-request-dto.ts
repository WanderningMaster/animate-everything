type UserUpdateRequestDto = Partial<{
  email: string;
  username: string;
  privacy: boolean;
}>;

export { UserUpdateRequestDto };
