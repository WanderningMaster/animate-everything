import React, { FC } from "react";
import { toast, Id } from "react-toastify";

type UploadFileProps = {
  title?: string;
  eventCb: (selectedFile: File) => void;
};

// due to file size upload limit to cloud we cant handle large files
const FILE_SIZE_LIMIT = 1048576; //1mb in bytes

export const UploadFile: FC<UploadFileProps> = ({ eventCb, title = "Upload Avatar" }) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const notifyToLarge = (): Id => toast("File too large", { type: "error" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      if (e.target.files[0].size <= FILE_SIZE_LIMIT) {
        eventCb(e.target.files[0]);
        return;
      }
      notifyToLarge();
    }
  };

  const handleClick = (): void => {
    hiddenFileInput.current?.click();
  };

  return (
    <div className="w-full h-full">
      <label
        onClick={handleClick}
        className="py-2 px-4 w-full block text-center bg-slate-600 text-white font-semibold shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 rounded cursor-pointer"
      >
        {title}
      </label>
      <input
        ref={hiddenFileInput}
        onChange={handleChange}
        id="file"
        type="file"
        className=" hidden w-full h-full bg-slate-500"
      />
    </div>
  );
};
