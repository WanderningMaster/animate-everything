import { Header } from "components/header";
import { SearchInput } from "components/search-input";
import React, { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isUseLayout = location.pathname !== "/login";
  return isUseLayout ? (
    <div className={"flex flex-row w-full h-full justify-center bg-slate-800"}>
      <div className={"flex flex-col space-y-6 w-8/12 py-8"}>
        <Header />
        <div className="bg-slate-800 sticky my-8 top-0 z-50">
          <SearchInput />
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};
