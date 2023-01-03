import { MainPage } from "pages/main";
import { AppLayout } from "layouts/app-layout";
import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/auth";
import { GifPage } from "pages/gif-page";
import { GifPageFullScreen } from "pages/gif-page/full-screen";
import { GifPageShared } from "pages/gif-page/shared";
import { AuthorPage } from "pages/author-page";
import { AuthProvider } from "providers/auth-provider";
import "react-toastify/dist/ReactToastify.css";
import { SettingsPage } from "pages/settings-page";
import { CardProvider } from "providers/card-provider";

const App: FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CardProvider>
          <AppLayout>
            <Routes>
              <Route path={"/"} element={<MainPage />} />
              <Route path={"/author/:id"} element={<AuthorPage />} />
              <Route path={"/gif/:id"} element={<GifPage />} />
              <Route path={"/gif/fullscreen/:id"} element={<GifPageFullScreen />} />
              <Route path={"/gif/shared/:id"} element={<GifPageShared />} />
              <Route path={"/login"} element={<Auth />} />
              <Route path={"/settings"} element={<SettingsPage />} />
            </Routes>
          </AppLayout>
        </CardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export { App };
