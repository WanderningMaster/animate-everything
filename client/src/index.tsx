import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scaffold.css";
import { SignInPage } from "./pages/auth/sign-in-page";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SignInPage />
  </React.StrictMode>,
);