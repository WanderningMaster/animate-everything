import { useFetchAllUsers } from "api/user-api/user-api";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Link } from "components/common";
import { useMe, useSignOut } from "api/auth-api/auth-api";
import { AppRoute } from "shared/build";

export const Main: FC = () => {
  const { isLoading, users, isError, isFetched } = useFetchAllUsers();
  const { isAuth } = useMe();
  const { mutateAsync: signOutAsync } = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = async (): Promise<void> => {
    await signOutAsync();
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {users &&
        isFetched &&
        users.map((user) => (
          <ul key={user.id}>
            <Link to={AppRoute.$ID}>
              <li>{user.username}</li>
            </Link>
          </ul>
        ))}
      <ul>
        <Link to={AppRoute.ME}>
          <li>Me</li>
        </Link>
      </ul>
      {isAuth &&
        <Button title={"Sign out"} onClick={handleSignOut} />}
    </div>
  );
};
