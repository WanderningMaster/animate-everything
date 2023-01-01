import { MainPage } from "pages/main";
import { AppLayout } from "layouts/app-layout";
import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/auth";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/login"} element={<Auth />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export { App };
