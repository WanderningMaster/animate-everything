import { Link } from "components/common";
import { LikeButton } from "components/common/like";
import { Typography } from "components/common/typography";
import React, { FC, useState } from "react";

type GifCardProps = {
  id: string;
  author: string;
  avatar: string;
  src: string;
  isFavorite: boolean;
};

export const GifCard: FC<GifCardProps> = ({ id, src, author, avatar, isFavorite }) => {
  const [isLiked, setIsLiked] = useState(isFavorite);

  const handleClickLike = (): void => {
    setIsLiked((state) => !state);
  };

  return (
    <div className={"cursor-pointer filter brightness-100 hover:brightness-75 transition duration-500 ease-in-out"}>
      <Link to={`/gif/${id}`}>
        <img src={src} className={"w-full h-full object-cover "} />
      </Link>
      <div className="flex relative items-end justify-between w-[calc(100%-16px)] space-x-4 bottom-12 left-2">
        <div className="flex items-end space-x-4">
          <img src={avatar} className={"w-9 h-9 object-cover ml-2"} />
          <Typography bold text={author} />
        </div>
        <div className={"w-9"}>
          <LikeButton onClick={handleClickLike} isActive={isLiked} />
        </div>
      </div>
    </div>
  );
};
