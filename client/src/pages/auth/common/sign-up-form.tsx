import { FC } from "react";
import { Button, Input, Link } from "components/components";
import { AppRoute } from "shared/build";

export const SignUpForm: FC = () => {
  return (
    <>
      <form className={"flex flex-col justify-center w-full"}>
        <Input label="Email" placeholder="Email" type="email" />
        <Input label="Username" placeholder="Username" type="text" />
        <Input label="Password" placeholder="Password" type="password" />
        <Input label="Confirm Password" placeholder="Confirm your password" type="password" />
        <Button title={"Sign up"} />
      </form>
      <Link to={AppRoute.ROOT} className={"link mt-3"}>
        Already have account?
      </Link>
    </>
  );
};
