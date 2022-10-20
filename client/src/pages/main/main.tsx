import { useFetchAllUsers } from "api/user-api/user-api";
import React, { FC } from "react";
import { Link } from "react-router-dom";

export const Main: FC = () => {
  const { isLoading, users, isError, isFetched } = useFetchAllUsers();

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
    </div>
  );
};
