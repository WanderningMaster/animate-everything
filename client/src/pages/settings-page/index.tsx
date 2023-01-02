import { Button, UploadFile } from "components/common";
import { Typography } from "components/common/typography";
import React, { FC, useState } from "react";
import { UpdateProfileForm, UpdateProfileFormValues } from "./form/update-profile-form";

export const SettingsPage: FC = () => {
  const handleClickUpdateProfile = (values: UpdateProfileFormValues): void => {
    console.log(values);
  };

  const [avatar] = useState(
    "https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9lZmRmZjIwN2Y0NDY5NjYyNDJkZDY4Y2EzNzc2NTJkOT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.n0Mx4FBTk1TVCk7D4zDnOC1QVIF87_rEZ8xsdZPUYkI",
  );

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
            <UpdateProfileForm isLoading={false} onSubmit={handleClickUpdateProfile} />
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
