import React, { FC } from "react";
import { GifCard } from "../gif-card";

type GifListProps = {
  list: Array<{
    id: string;
    src: string;
    author: string;
    avatar: string;
    isFavorite: boolean;
  }>;
};

export const GifList: FC<GifListProps> = ({ list }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {list.map(({ id, ...props }) => (
        <GifCard key={id} {...props} />
      ))}
    </div>
  );
};
