import React, { FC } from "react";
import clsx from "clsx";
import style from "./style.module.css";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
};

export const Button: FC<ButtonProps> = ({ title, onClick, disabled, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className={clsx(style["btn"], disabled && style["btn-disabled"])}>
      {title}
    </button>
  );
};
