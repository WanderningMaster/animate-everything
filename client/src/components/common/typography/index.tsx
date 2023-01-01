import React, { FC } from "react";

type TypographyProps = {
  type?: "default" | "heading" | "heading-xl";
  text: string;
};

export const Typography: FC<TypographyProps> = ({ type = "default", text }) => {
  const fontSize = type === "default" ? "text-lg" : type === "heading" ? "text-4xl" : "text-6xl";
  const fontWeight = type === "default" ? "font-normal" : "font-medium";
  return <span className={`text-white ${fontSize} ${fontWeight}`}>{text}</span>;
};
