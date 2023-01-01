import { Typography } from "components/common/typography";
import React, { FC } from "react";

export const MainPage: FC = () => {
  return (
    <div className="h-[2000px]">
      <Typography
        type="heading"
        text={
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis maxime, voluptates saepe fuga dolores commodi atque quaerat eligendi deserunt, numquam omnis reprehenderit nesciunt in est, odio officia odit ducimus esse."
        }
      />
    </div>
  );
};
