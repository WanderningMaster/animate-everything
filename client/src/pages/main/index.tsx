import { GifList } from "components/gif/gif-list";
import React, { FC } from "react";
// import { listItems } from "components/gif/gif-list/items.mock";
import { useQuery } from "react-query";
import { QueryKeys } from "shared/build";
import { gifService } from "services/services";

export const MainPage: FC = () => {
  const { isLoading, isFetching, data } = useQuery([QueryKeys.GIF], () => gifService.getAll(), {
    refetchOnMount: true,
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Failed to fetch</div>;
  }

  const listItems = data.map(({ id, mediaSrc, isLiked, author: { username, avatar } }) => ({
    id,
    src: mediaSrc,
    author: username,
    avatar,
    isFavorite: isLiked,
  }));

  return (
    <div className="pt-8">
      <GifList list={listItems} />
    </div>
  );
};
