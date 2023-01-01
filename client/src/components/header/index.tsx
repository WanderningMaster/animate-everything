import { useMe } from "api/api";
import React, { FC } from "react";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { Typography } from "components/common/typography";
import { Button } from "components/common";

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
          <Button title={isAuth ? "Profile" : "Sign in"} />
        </div>
      </div>
    </div>
  );
};
