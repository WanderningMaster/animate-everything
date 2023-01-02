import React, { FC } from "react";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { Typography } from "components/common/typography";
import { Button, Link } from "components/common";
import { AppRoute } from "shared/build";
import { useAuth } from "hooks/use-auth-hook";
import { ProfileButton } from "components/profile-button";

export const Header: FC = () => {
  const { isAuth, data } = useAuth();
  return (
    <div className={"flex flex-row justify-between"}>
      <Link to={AppRoute.ROOT}>
        <div className={"flex flex-row space-x-4 items-end"}>
          <Logo className={"w-10 h-auto fill-white"} />
          <Typography type="heading" text="Animate everything" />
        </div>
      </Link>
      <div className={"flex space-x-4 justify-end w-6/12"}>
        <div className={"w-3/12"}>
          <Button disabled={!isAuth} title={"Upload"} />
        </div>
        <div className={"w-5/12"}>
          {isAuth && data ? (
            <ProfileButton
              author="WanderningMaster"
              avatar="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9lZmRmZjIwN2Y0NDY5NjYyNDJkZDY4Y2EzNzc2NTJkOT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.n0Mx4FBTk1TVCk7D4zDnOC1QVIF87_rEZ8xsdZPUYkI"
            />
          ) : (
            <Link to={isAuth ? AppRoute.ROOT : AppRoute.LOGIN}>
              <Button title={"Sign in"} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
