import { GifList } from "components/gif/gif-list";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "components/common/typography";
import { useQuery } from "react-query";
import { QueryKeys } from "shared/build";
import { gifService } from "services/services";
import { useCards } from "providers/card-provider";
import { LoadMore } from "components/load-more";

export const AuthorPage: FC = () => {
  const { id } = useParams() as { id: string };
  const { pagination, setItemCount, setCards, cards: data, triggerReset } = useCards();
  useQuery(
    [QueryKeys.GIF, QueryKeys.USER, pagination, triggerReset],
    () => gifService.getByAuthor(id, { ...pagination }),
    {
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
    },
  );

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
    <div className="flex flex-col space-y-4 mt-10">
      <div className="flex items-end space-x-10">
        <img src={data[0].author.avatar} className={"rounded-xl drop-shadow-2xl w-32 h-32 object-cover"} />
        <Typography type="heading" text={data[0].author.username} />
      </div>
      <div className="pt-8 flex flex-col space-y-8">
        <Typography type="heading" text={"Gif`s:"} />
        <GifList list={listItems} />
        <LoadMore />
      </div>
    </div>
  );
};
