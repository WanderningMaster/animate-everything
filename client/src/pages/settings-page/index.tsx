import { Button, UploadFile } from "components/common";
import { Typography } from "components/common/typography";
import { useAuth } from "hooks/use-auth-hook";
import React, { FC, useState } from "react";
import { UpdateProfileForm, UpdateProfileFormValues } from "./form/update-profile-form";

export const SettingsPage: FC = () => {
  const handleClickUpdateProfile = (values: UpdateProfileFormValues): void => {
    console.log(values);
  };

  const { data } = useAuth();

  if (!data) {
    return <div>Error</div>;
  }

  const [avatar] = useState(data.me.avatar);

  return (
    <div className="flex flex-row h-auto space-x-4">
      <div className="w-3/12 h-1/2">
        <img className="w-full" src={avatar} />
        <UploadFile eventCb={(): void => console.log("test")} />
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
          <div className="w-3/4">
            <Button warning title={"Delete account"} />
          </div>
        </div>
      </div>
    </div>
  );
};
