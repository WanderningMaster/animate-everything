import React, { FC } from "react";

type TypographyProps = {
  bold?: boolean;
  type?: "default" | "heading" | "heading-xl";
  text: string;
};

export const Typography: FC<TypographyProps> = ({ type = "default", text, bold }) => {
  const fontSize = type === "default" ? "text-lg" : type === "heading" ? "text-4xl" : "text-6xl";
  const fontWeight = type === "default" ? "font-normal" : "font-medium";
  return <span className={`text-white ${fontSize} ${bold ? "font-bold" : fontWeight}`}>{text}</span>;
};
