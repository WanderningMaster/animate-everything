import { Button } from "components/common";
import { useCards } from "providers/card-provider";
import React, { FC } from "react";

export const LoadMore: FC = () => {
  const {
    setPagination,
    itemCount,
    pagination: { take, skip },
  } = useCards();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPagination(({ take, skip }) => {
      if (take === undefined || skip === undefined) {
        return { take: 6, skip: 0 };
      }
      return { take: 3, skip: skip + take };
    });
  };
  return take + skip < itemCount ? <Button title={"Load more"} onClick={handleClick} /> : null;
};
