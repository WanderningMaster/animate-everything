import { GifList } from "components/gif/gif-list";
import React, { FC, useEffect } from "react";
// import { listItems } from "components/gif/gif-list/items.mock";
import { useQuery } from "react-query";
import { QueryKeys } from "shared/build";
import { gifService } from "services/services";
import { useCards } from "providers/card-provider";

export const MainPage: FC = () => {
  const { search } = useCards();
  const { isLoading, isFetching, data } = useQuery([QueryKeys.GIF, search], () => gifService.getAll({ search }), {
    refetchOnMount: true,
  });

  useEffect(() => {
    console.log(search);
  }, [search]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Failed to fetch</div>;
  }

  const listItems = data.map(({ id, mediaSrc, isLiked, author: { username, avatar, id: authorId } }) => ({
    id,
    src: mediaSrc,
    author: username,
    authorId,
    avatar,
    isFavorite: isLiked,
  }));

  return (
    <div className="pt-8">
      <GifList list={listItems} />
    </div>
  );
};
