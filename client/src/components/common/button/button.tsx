import React, { FC } from "react";
import clsx from "clsx";
import style from "./style.module.css";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({ title, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={clsx(style["btn"], disabled && style["btn-disabled"])} disabled={disabled}>
      {title}
    </button>
  );
};
