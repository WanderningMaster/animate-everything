import { FC } from "react";
import { Button, Input } from "components/components";
import { UserResponseDto, UserUpdateRequestDto } from "shared/build";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userUpdate } from "shared/build/validation-schemas/validation-schemas";
import { Toggle } from "components/common/toggle";

export type UpdateProfileFormValues = Partial<{
  username: string;
  email: string;
  privacy: boolean;
}>;

type Props = {
  data: UserResponseDto;
  isLoading: boolean;
  onSubmit: (formValue: UpdateProfileFormValues) => void;
};

export const UpdateProfileForm: FC<Props> = ({ isLoading, onSubmit, data }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<UserUpdateRequestDto>({
    defaultValues: { username: data.username, email: data.email, privacy: data.privacy },
    resolver: joiResolver(userUpdate),
    mode: "onChange",
  });

  return (
    <>
      <form className={"flex flex-col justify-center w-full"} onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} name={"email"} label="Email" placeholder="Email" type="email" />
        <Input control={control} name={"username"} label="Username" placeholder="Username" type="text" />
        <label className={"text-white px-1 flex flex-row justify-between"}>
          <div>{"Privacy"}</div>
        </label>
        <Toggle control={control} setValue={setValue} name={"privacy"} defaultValue={data.privacy} />
        <Button type={"submit"} title={"Save"} disabled={isLoading || !isValid} />
      </form>
    </>
  );
};
