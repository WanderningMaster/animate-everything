import { Typography } from "components/common/typography";
import { listItems } from "components/gif/gif-list/items.mock";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Link } from "components/common";

export const GifPageFullScreen: FC = () => {
  const { id } = useParams();
  const gif = listItems.find((gif) => gif.id === id);
  if (!gif) {
    return <Typography text={"Failed to fetch"} />;
  }

  const { src } = gif;

  return (
    <Link to={`/gif/${id}`}>
      <div className={"bg-slate-800 h-screen w-full flex items-center justify-center"}>
        <img src={src} className={"w-auto h-4/5"} />
      </div>
    </Link>
  );
};
