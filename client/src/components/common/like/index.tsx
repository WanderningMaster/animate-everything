import React, { FC } from "react";
import { ReactComponent as Heart } from "assets/images/heart.svg";
import { ReactComponent as HeartActive } from "assets/images/heart-filled.svg";

type LikeButtonProps = {
  isActive: boolean;
  onClick?: () => void;
};

export const LikeButton: FC<LikeButtonProps> = ({ isActive, onClick }) => {
  const iconStyles = "w-full h-auto";
  return (
    <div onClick={onClick}>{isActive ? <HeartActive className={iconStyles} /> : <Heart className={iconStyles} />}</div>
  );
};
