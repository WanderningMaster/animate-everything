import { useMe } from "api/api";
import React, { FC } from "react";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { Typography } from "components/common/typography";
import { Button, Link } from "components/common";
import { AppRoute } from "shared/build";

export const Header: FC = () => {
  const { isAuth } = useMe();
  return (
    <div className={"flex flex-row justify-between"}>
      <div className={"flex flex-row space-x-4 items-end"}>
        <Logo className={"w-10 h-auto fill-white"} />
        <Typography type="heading" text="Animate everything" />
      </div>
      <div className={"flex space-x-4 justify-end w-6/12"}>
        <div className={"w-3/12"}>
          <Button disabled={!isAuth} title={"Upload"} />
        </div>
        <div className={"w-5/12"}>
          <Link to={isAuth ? AppRoute.ROOT : AppRoute.LOGIN}>
            <Button title={isAuth ? "Profile" : "Sign in"} />
          </Link>
        </div>
      </div>
    </div>
  );
};
