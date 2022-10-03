import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scaffold.css";
import { App } from "./application/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);