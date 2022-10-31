import React, { FC } from "react";
import { useMe } from "api/auth-api/auth-api";
// import { Link } from "components/common";
import { AppRoute } from "shared/build";
import { Link } from "react-router-dom";

export const MeInfo: FC = () => {
  const { user, isLoading, isAuth } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Link to={AppRoute.LOGIN}>
      <div>Not Logged in</div>
    </Link>;
  }

  return (
    <div>
      {user && (
        <ul>
          <li>ID: {user.id}</li>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
        </ul>
      )}
    </div>
  );
};
