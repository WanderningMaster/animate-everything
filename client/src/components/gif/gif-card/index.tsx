import { Link } from "components/common";
import { LikeButton } from "components/common/like";
import { Typography } from "components/common/typography";
import { useAuth } from "hooks/use-auth-hook";
import React, { FC, useState } from "react";
import { useMutation } from "react-query";
import { gifService } from "services/services";
import { QueryKeys } from "shared/build";

type GifCardProps = {
  id: string;
  author: string;
  authorId: string;
  avatar: string;
  src: string;
  isFavorite: boolean;
};

export const GifCard: FC<GifCardProps> = ({ id, src, author, avatar, isFavorite, authorId }) => {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const { isAuth } = useAuth();

  const { mutateAsync: addReactionAsync } = useMutation([QueryKeys.GIF, QueryKeys.USER], (payload: { gifId: string }) =>
    gifService.addReaction(payload),
  );

  const handleClickLike = (): void => {
    setIsLiked((state) => !state);
    addReactionAsync({ gifId: id });
  };

  return (
    <div className={"group cursor-pointer"}>
      <Link to={`/gif/${id}`}>
        <img
          src={src}
          className={
            "rounded-xl drop-shadow-2xl w-full h-full object-cover filter brightness-100 group-hover:brightness-50 transition duration-500 ease-in-out"
          }
        />
      </Link>
      <div className="flex relative items-end group-hover:brightness-90 transition duration-500 ease-in-out justify-between w-[calc(100%-16px)] space-x-4 bottom-12 left-2">
        <Link to={`/author/${authorId}`}>
          <div className="flex items-end space-x-4">
            <img src={avatar} className={"w-9 h-9 object-cover ml-2"} />
            <Typography bold text={author} />
          </div>
        </Link>
        <div className={"w-9"}>{isAuth && <LikeButton onClick={handleClickLike} isActive={isLiked} />}</div>
      </div>
    </div>
  );
};
