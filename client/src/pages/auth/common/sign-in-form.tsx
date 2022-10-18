import { FC } from "react";
import { Button, Input, Link } from "components/components";
import { AppRoute } from "shared/build";

export const SignInForm: FC = () => {
  return (
    <>
      <form className={"flex flex-col justify-center w-full"}>
        <Input label="Email" placeholder="Email" type="email" />
        <Input label="Password" placeholder="Password" type="password" />
        <Button title={"Sign in"} />
      </form>
      <Link to={AppRoute.ROOT} className={"link mt-3"}>
        Forgot your password?
      </Link>
    </>
  );
};
