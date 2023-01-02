import { LikeButton } from "components/common/like";
import { Typography } from "components/common/typography";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Copy } from "assets/images/copy.svg";
import { ReactComponent as FullScreen } from "assets/images/full-screen.svg";
import { Link } from "components/common";
import { UploadButton } from "components/upload-button";
import { useMutation, useQuery } from "react-query";
import { QueryKeys } from "shared/build";
import { gifService } from "services/services";
import { useAuth } from "hooks/use-auth-hook";

export const GifPage: FC = () => {
  const { id } = useParams() as { id: string };
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);
  const [likeCount, setLikeCount] = useState(0);
  const [copy, setCopy] = useState("Copy");
  const { isAuth } = useAuth();

  const {
    data: gif,
    isLoading,
    isFetching,
  } = useQuery([QueryKeys.GIF], () => gifService.getOne(id), {
    onSuccess: (data) => {
      if (data) {
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      }
    },
    refetchOnMount: true,
  });

  const { mutateAsync: addReactionAsync } = useMutation([QueryKeys.GIF, QueryKeys.USER], (payload: { gifId: string }) =>
    gifService.addReaction(payload),
  );

  if (isLoading || isFetching) {
    return <Typography text={"Loading..."} />;
  }

  if (!gif || isLiked === undefined) {
    return <Typography text={"Failed to fetch"} />;
  }

  const {
    author: { username: author },
    mediaSrc: src,
    title,
  } = gif;

  const handleClickLike = async (): Promise<void> => {
    setIsLiked((state) => !state);
    setLikeCount((state) => (!isLiked ? state + 1 : state - 1));
    await addReactionAsync({ gifId: id });
  };

  const handleClickCopy = (): void => {
    setCopy("Copied...");
    setTimeout(() => {
      setCopy("Copy");
    }, 1000);
  };

  return (
    <div className={"h-full flex justify-between space-x-4"}>
      <div className="flex flex-col space-y-2 w-8/12">
        <div>
          <Typography text={`${title}`} />
          <Link to={`/author/${author}`}>
            <Typography bold text={` by ${author}`} />
          </Link>
        </div>
        <div className=" w-full h-full">
          <img src={src} className={"rounded-xl drop-shadow-2xl w-full object-cover"} />
          <Link to={`/gif/fullscreen/${id}`}>
            <div className="relative bottom-16 left-6 w-10 cursor-pointer">
              <FullScreen className="fill-white" />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-4/12 cursor-pointer space-y-12 px-6 py-14">
        <div onClick={handleClickLike} className="flex flex-col">
          <div className={"flex flex-row items-end space-x-8"}>
            {isAuth && (
              <div className="w-9">
                <LikeButton isActive={isLiked} />
              </div>
            )}
            <Typography bold text={`Liked: ${likeCount}`} />
          </div>
        </div>
        <div onClick={handleClickCopy} className="flex flex-col cursor-pointer">
          <div className={"flex flex-row items-end space-x-8"}>
            <div className="w-9">
              <Copy className="fill-white" />
            </div>
            <Typography bold text={copy} />
          </div>
        </div>
        <div className="flex flex-col cursor-pointer">
          <div className={"flex flex-row items-end space-x-8"}>
            <div className="w-9">
              <UploadButton cb={(): void => console.log("uploaded")} title={title} url={src} />
            </div>
            <Typography bold text={"Upload"} />
          </div>
        </div>
      </div>
    </div>
  );
};
