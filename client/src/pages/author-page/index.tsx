import { GifList } from "components/gif/gif-list";
import React, { FC } from "react";
import { listItems } from "components/gif/gif-list/items.mock";
import { useParams } from "react-router-dom";
import { Typography } from "components/common/typography";

export const AuthorPage: FC = () => {
  const { id } = useParams();
  const gifs = listItems.filter((gif) => gif.author === id);
  const { author, avatar } = gifs[0];

  return (
    <div className="flex flex-col space-y-4 mt-10">
      <div className="flex items-end space-x-10">
        <img src={avatar} className={" w-32 h-32 object-cover"} />
        <Typography type="heading" text={author} />
      </div>
      <div className="pt-8 h-[2000px] flex flex-col space-y-8">
        <Typography type="heading" text={"Gif`s:"} />
        <GifList list={gifs} />
      </div>
    </div>
  );
};
