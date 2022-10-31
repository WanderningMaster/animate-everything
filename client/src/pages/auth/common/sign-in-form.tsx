import { FC, useEffect } from "react";
import { Button, Input, Link } from "components/components";
import { AppRoute } from "shared/build";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userSignIn } from "shared/build/validation-schemas/validation-schemas"; //FIXME

export interface SignInFormValues {
  email: string;
  password: string;
}

type Props = {
  isLoading: boolean;
  onSubmit: (formValue: SignInFormValues) => void;
};

export const SignInForm: FC<Props> = ({ isLoading, onSubmit }) => {
  const { control, handleSubmit, formState: { isValid } } = useForm<SignInFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: joiResolver(userSignIn),
    mode: "onChange",
  });

  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col justify-center w-full"}>
        <Input control={control} name={"email"} label="Email" placeholder="Email" type="email" />
        <Input control={control} name={"password"} label="Password" placeholder="Password" type="password" />
        <Button type={"submit"} title={"Sign in"} disabled={!isValid || isLoading} />
      </form>
      <Link to={AppRoute.ROOT} className={"link mt-3"}>
        Forgot your password?
      </Link>
    </>
  );
};
