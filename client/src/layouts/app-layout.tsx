import { Header } from "components/header";
import { SearchInput } from "components/search-input";
import React, { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isUseSearchbar = location.pathname === "/";
  const isUseLayout =
    location.pathname !== "/login" &&
    !location.pathname.includes("/gif/fullscreen/") &&
    !location.pathname.includes("/gif/shared/");
  return isUseLayout ? (
    <div className={"flex flex-row w-full h-screen justify-center bg-slate-800"}>
      <div className={"flex flex-col w-8/12 py-8"}>
        <Header />

        <div className=" bg-slate-800 z-40 sticky top-0 py-8">{isUseSearchbar && <SearchInput />}</div>
        <div className=" overflow-y-auto no-scrollbar">{children}</div>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};
