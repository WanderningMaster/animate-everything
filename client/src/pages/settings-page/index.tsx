import { Button, UploadFile } from "components/common";
import { Typography } from "components/common/typography";
import { useAuth } from "hooks/use-auth-hook";
import React, { FC, useState } from "react";
import { UpdateProfileForm, UpdateProfileFormValues } from "./form/update-profile-form";

export const SettingsPage: FC = () => {
  const { updateAvatarAsync, updateProfileAsync } = useAuth();
  const [isConfirmDelete, setIsConfirmDelete] = useState<"clicked" | "confirmed" | "pending">("pending");

  const handleClickUpdateProfile = async (values: UpdateProfileFormValues): Promise<void> => {
    await updateProfileAsync(values);
  };

  const handleClickUpdateAvatar = async (file: File): Promise<void> => {
    const data = new FormData();
    data.append("data", file);
    const user = await updateAvatarAsync(data);
    setAvatar(user.avatar);
  };

  const { data, deleteProfileAsync } = useAuth();

  if (!data) {
    return <div>Error</div>;
  }

  const [avatar, setAvatar] = useState(data.me.avatar);

  const handleClickDelete = (): void => {
    setIsConfirmDelete("clicked");
  };

  const handleClickConfirmDelete = async (): Promise<void> => {
    setIsConfirmDelete("confirmed");
    await deleteProfileAsync();
  };

  const handleClickDeclineDelete = (): void => {
    setIsConfirmDelete("pending");
  };

  return (
    <div className="flex flex-row h-auto space-x-4">
      <div className="w-3/12 h-96">
        <div className="w-full h-2/3">
          <img className="rounded w-full h-full object-cover" src={avatar} />
        </div>
        <UploadFile eventCb={handleClickUpdateAvatar} />
      </div>
      <div className="w-9/12 h-1/2 flex flex-col space-y-6">
        <div className=" bg-slate-900 rounded-xl w-full h-full p-12 flex flex-col items-center space-y-10">
          <div className="w-auto">
            <Typography type="heading-xl" text="Account Settings" />
          </div>
          <div className="w-3/4">
            <UpdateProfileForm data={data.me} isLoading={false} onSubmit={handleClickUpdateProfile} />
          </div>
        </div>
        <div className=" bg-slate-900 rounded-xl w-full h-full p-12 flex flex-col items-center space-y-10">
          {isConfirmDelete === "pending" ? (
            <div className="w-3/4">
              <Button onClick={handleClickDelete} warning title={"Delete account"} />
            </div>
          ) : (
            <div className="w-3/4 flex flex-row space-x-2">
              <Button onClick={handleClickConfirmDelete} warning title={"Confirm"} />
              <Button onClick={handleClickDeclineDelete} warning title={"Decline"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
