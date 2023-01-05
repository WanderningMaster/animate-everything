import React, { FC } from "react";
import { ReactComponent as Logo } from "assets/images/logo.svg";
import { Typography } from "components/common/typography";
import { Button, Link } from "components/common";
import { AppRoute } from "shared/build";
import { useAuth } from "hooks/use-auth-hook";
import { ProfileButton } from "components/profile-button";
import { useCards } from "providers/card-provider";

export const Header: FC = () => {
  const { isAuth, data } = useAuth();
  const { setTriggerReset, setPagination, setCards } = useCards();

  const handleClickLogo = (): void => {
    setTriggerReset((state) => !state);
    setCards(undefined);
    setPagination({ take: 6, skip: 0 });
  };

  return (
    <div className={"flex flex-row justify-between"}>
      <Link to={AppRoute.ROOT}>
        <div onClick={handleClickLogo} className={"flex flex-row space-x-4 items-end"}>
          <Logo className={"w-10 h-auto fill-white"} />
          <Typography type="heading" text="Animate everything" />
        </div>
      </Link>
      <div className={"flex space-x-4 justify-end w-6/12"}>
        <div className={"w-3/12"}>
          <Link to={isAuth ? "/upload" : AppRoute.LOGIN}>
            <Button disabled={!isAuth} title={"Upload"} />
          </Link>
        </div>
        <div className={"w-5/12"}>
          {isAuth && data ? (
            <ProfileButton author={data.me.username} authorId={data.me.id} avatar={data.me.avatar} />
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
