import { useFetchAllUsers } from "api/user-api/user-api";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Link, UploadFile } from "components/common";
import { useMe, useSignOut } from "api/auth-api/auth-api";
import { AppRoute } from "shared/build";
import { useMutation } from "react-query";
import { gifService } from "services/services";

export const Main: FC = () => {
  const { isLoading, users, isError, isFetched } = useFetchAllUsers();
  const { isAuth } = useMe();
  const { mutateAsync: signOutAsync } = useSignOut();
  const [url, setUrl] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleSignOut = async (): Promise<void> => {
    await signOutAsync();
    navigate("/login");
  };

  const { mutateAsync: uploadAsync } = useMutation(["gif"], (data: FormData) => gifService.upload(data), {
    onSuccess: (data) => {
      console.log("url: ", data);
      if (data) {
        setUrl(data.res);
      }
    },
  });

  const handleClickUploadVideo = async (selectedFile: File): Promise<void> => {
    const data = new FormData();
    data.append("data", selectedFile);
    await uploadAsync(data);
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
      <ul>
        <UploadFile eventCb={handleClickUploadVideo} />
        <img src={url} />
      </ul>
      {isAuth && <Button title={"Sign out"} onClick={handleSignOut} />}
    </div>
  );
};
