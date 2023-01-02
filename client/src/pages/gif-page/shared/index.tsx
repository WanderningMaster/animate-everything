import { Typography } from "components/common/typography";
import { listItems } from "components/gif/gif-list/items.mock";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { UploadButton } from "components/upload-button";

export const GifPageShared: FC = () => {
  const { id } = useParams();
  const gif = listItems.find((gif) => gif.id === id);
  if (!gif) {
    return <Typography text={"Failed to fetch"} />;
  }

  const { src, title, author } = gif;
  return (
    <div className={"bg-slate-800 h-screen w-full flex items-center justify-center"}>
      <div className="flex flex-col space-y-4 w-6/12">
        <div className="flex flex-row justify-between">
          <div>
            <Typography type="heading" text={`${title}`} />
            <Typography type="heading" text={` by ${author}`} />
          </div>
          <div className="w-9">
            <UploadButton cb={(): void => console.log("uploaded")} title={title} url={src} />
          </div>
        </div>
        <img src={src} className={"w-auto h-4/5"} />
      </div>
    </div>
  );
};