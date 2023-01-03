import { GifList } from "components/gif/gif-list";
import React, { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { QueryKeys } from "shared/build";
import { gifService } from "services/services";
import { useCards } from "providers/card-provider";
import { LoadMore } from "components/load-more";

export const MainPage: FC = () => {
  const { search, pagination, setItemCount, setCards, cards: data, triggerReset } = useCards();

  useQuery([QueryKeys.GIF, search, pagination, triggerReset], () => gifService.getAll({ search, ...pagination }), {
    refetchOnMount: true,
    onSuccess: (data) => {
      if (data) {
        setCards((state) => {
          if (!state) {
            return data.data;
          }
          return [...state, ...data.data];
        });
        setItemCount(data.itemCount);
      }
    },
  });

  useEffect(() => {
    console.log(search);
  }, [search]);

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
      <div className="pt-8">
        <LoadMore />
      </div>
    </div>
  );
};
