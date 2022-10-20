import { Main } from "pages/main/main";
import { UserInfo } from "pages/user/user-info";
import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/auth";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={":id"} element={<UserInfo />} />
        <Route path={"/login"} element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
