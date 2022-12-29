import React, { FC, useState } from "react";

type UploadFileProps = {
  eventCb: (selectedFile: File) => void;
};

export const UploadFile: FC<UploadFileProps> = ({ eventCb }) => {
  const [filename, setFilename] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFilename(e.target.files[0].name);
      eventCb(e.target.files[0]);
    }
  };

  return (
    <div>
      <input onChange={handleChange} type="file" />
      <div>{filename}</div>
    </div>
  );
};
