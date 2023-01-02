import { LikeButton } from "components/common/like";
import { Typography } from "components/common/typography";
import { listItems } from "components/gif/gif-list/items.mock";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Copy } from "assets/images/copy.svg";
import { ReactComponent as FullScreen } from "assets/images/full-screen.svg";
import { Link } from "components/common";
import { UploadButton } from "components/upload-button";

export const GifPage: FC = () => {
  const { id } = useParams();
  const gif = listItems.find((gif) => gif.id === id);
  if (!gif) {
    return <Typography text={"Failed to fetch"} />;
  }

  const { author, src, isFavorite, title } = gif;
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [copy, setCopy] = useState("Copy");

  const handleClickLike = (): void => {
    setIsLiked((state) => !state);
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
          <Typography bold text={` by ${author}`} />
        </div>
        <div>
          <img src={src} className={"w-full h-8/12 object-cover"} />
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
            <div className="w-9">
              <LikeButton isActive={isLiked} />
            </div>
            <Typography bold text={"Favorite"} />
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
