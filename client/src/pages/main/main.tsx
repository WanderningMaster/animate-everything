import { useFetchAllUsers } from "api/user-api/user-api";
import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/common";
import { useSignOut } from "../../api/auth-api/auth-api";

export const Main: FC = () => {
  const { isLoading, users, isError, isFetched } = useFetchAllUsers();
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
            <Link to={`/${user.id}`}>
              <li>{user.username}</li>
            </Link>
          </ul>
        ))}
      <Button title={"Sign out"} onClick={handleSignOut} />
    </div>
  );
};
