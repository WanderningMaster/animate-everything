import { MainPage } from "pages/main";
import { AppLayout } from "layouts/app-layout";
import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/auth";
import { GifPage } from "pages/gif-page";
import { GifPageFullScreen } from "pages/gif-page/full-screen";
import { GifPageShared } from "pages/gif-page/shared";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/gif/:id"} element={<GifPage />} />
          <Route path={"/gif/fullscreen/:id"} element={<GifPageFullScreen />} />
          <Route path={"/gif/shared/:id"} element={<GifPageShared />} />
          <Route path={"/login"} element={<Auth />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export { App };
