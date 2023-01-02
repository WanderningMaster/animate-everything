import React, { FC } from "react";
import { ReactComponent as Upload } from "assets/images/download.svg";
import FileSaver from "file-saver";

type UploadButtonProps = {
  url: string;
  title: string;
  cb: () => void;
};

export const UploadButton: FC<UploadButtonProps> = ({ url, cb, title }) => {
  const handleClickUpload = (): void => {
    FileSaver.saveAs(url, `${title}_.gif`);
    cb();
  };
  return <Upload onClick={handleClickUpload} className="fill-white w-full cursor-pointer" />;
};
