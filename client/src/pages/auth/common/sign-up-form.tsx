import { FC } from "react";
import { Button, Input, Link } from "components/components";
import { AppRoute } from "shared/build";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userSignUp } from "shared/build/validation-schemas/validation-schemas";

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type Props = {
  isLoading: boolean;
  onSubmit: (formValue: SignUpFormValues) => void;
};

export const SignUpForm: FC<Props> = ({ isLoading, onSubmit }) => {
  const { control, handleSubmit, formState: { isValid } } = useForm<SignUpFormValues>({
    defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
    resolver: joiResolver(userSignUp),
    mode: "onChange",
  });
  return (
    <>
      <form className={"flex flex-col justify-center w-full"} onSubmit={handleSubmit(onSubmit)}>
        <Input control={control} name={"email"} label="Email" placeholder="Email" type="email" />
        <Input control={control} name={"username"} label="Username" placeholder="Username" type="text" />
        <Input control={control} label="Password" name={"password"} placeholder="Password" type="password" />
        <Input control={control} label="Confirm Password" name={"confirmPassword"} placeholder="Confirm your password"
               type="password" />
        <Button type={"submit"} title={"Sign up"} disabled={isLoading || !isValid} />
      </form>
      <Link to={AppRoute.ROOT} className={"link mt-3"}>
        Already have account?
      </Link>
    </>
  );
};
