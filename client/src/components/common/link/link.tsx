import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { AppRoute } from "shared/build";

type LinkProps = {
  to: AppRoute;
  className: string;
  children: ReactNode;
};

export const Link: FC<LinkProps> = ({ to, className, children }) => {
  return (
    <NavLink className={className} to={to}>
      {children}
    </NavLink>
  );
};
