import { Typography } from "components/common/typography";
import { listItems } from "components/gif/gif-list/items.mock";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

export const GifPageShared: FC = () => {
  const { id } = useParams();
  const gif = listItems.find((gif) => gif.id === id);
  if (!gif) {
    return <Typography text={"Failed to fetch"} />;
  }

  const { src, title, author } = gif;

  return (
    <div className={"bg-slate-800 h-screen w-full flex items-center justify-center"}>
      <div className="flex flex-col space-y-2 w-6/12">
        <div>
          <Typography type="heading" text={`${title}`} />
          <Typography type="heading" text={` by ${author}`} />
        </div>
        <img src={src} className={"w-auto h-4/5"} />
      </div>
    </div>
  );
};
