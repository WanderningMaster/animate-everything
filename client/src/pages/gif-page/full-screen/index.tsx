import { Typography } from "components/common/typography";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Link } from "components/common";
import { useQuery } from "react-query";
import { QueryKeys } from "shared/build";
import { gifService } from "services/services";

export const GifPageFullScreen: FC = () => {
  const { id } = useParams() as { id: string };
  const { data: gif, isLoading, isFetching } = useQuery([QueryKeys.GIF], () => gifService.getOne(id));

  if (isLoading || isFetching) {
    return <Typography text={"Loading..."} />;
  }
  if (!gif) {
    return <Typography text={"Failed to fetch"} />;
  }

  const { mediaSrc: src } = gif;

  return (
    <Link to={`/gif/${id}`}>
      <div className={"bg-slate-800 h-screen w-full flex items-center justify-center"}>
        <img src={src} className={"w-auto h-4/5"} />
      </div>
    </Link>
  );
};
