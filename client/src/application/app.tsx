import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "../pages/auth/auth";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={"Hello world"} />
        <Route path={"/login"} element={<Auth />} />
      </Routes>
    </BrowserRouter>

  );
};

export { App };
