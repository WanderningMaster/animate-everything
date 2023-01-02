import { GifList } from "components/gif/gif-list";
import React, { FC } from "react";
import { listItems } from "components/gif/gif-list/items.mock";

export const MainPage: FC = () => {
  return (
    <div className="pt-8">
      <GifList list={listItems} />
    </div>
  );
};
