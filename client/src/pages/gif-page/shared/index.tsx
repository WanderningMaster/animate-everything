import { Typography } from "components/common/typography";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { UploadButton } from "components/upload-button";
import { Link } from "components/common";
import { useQuery } from "react-query";
import { QueryKeys } from "shared/build";
import { gifService } from "services/services";

export const GifPageShared: FC = () => {
  const { id } = useParams() as { id: string };
  const { data: gif, isLoading, isFetching } = useQuery([QueryKeys.GIF], () => gifService.getOne(id));

  if (isLoading || isFetching) {
    return <Typography text={"Loading..."} />;
  }
  if (!gif) {
    return <Typography text={"Failed to fetch"} />;
  }

  const {
    mediaSrc: src,
    title,
    author: { username: author, id: authorId },
  } = gif;
  return (
    <div className={"bg-slate-800 h-screen w-full flex items-center justify-center"}>
      <div className="flex flex-col space-y-4 w-6/12">
        <div className="flex flex-row w-10/12 self-center justify-between">
          <div>
            <Typography type="heading" text={`${title}`} />
            <Link to={`/author/${authorId}`}>
              <Typography type="heading" text={` by ${author}`} />
            </Link>
          </div>
          <div className="w-9">
            <UploadButton cb={(): void => console.log("uploaded")} title={title} url={src} />
          </div>
        </div>
        <img src={src} className={" self-center w-10/12 h-auto"} />
      </div>
    </div>
  );
};
