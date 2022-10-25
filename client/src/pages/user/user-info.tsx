import { useFetchOneUser } from "api/user-api/user-api";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

export const UserInfo: FC = () => {
  const { id } = useParams() as { id: string };
  const { isLoading, isError, isFetched, user } = useFetchOneUser(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {isFetched && user && (
        <ul>
          <li>ID: {user.id}</li>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
        </ul>
      )}
    </div>
  );
};
