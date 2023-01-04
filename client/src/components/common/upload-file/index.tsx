import React, { FC } from "react";

type UploadFileProps = {
  title?: string;
  eventCb: (selectedFile: File) => void;
};

export const UploadFile: FC<UploadFileProps> = ({ eventCb, title = "Upload Avatar" }) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      eventCb(e.target.files[0]);
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
