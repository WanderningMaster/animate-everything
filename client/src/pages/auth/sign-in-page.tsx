import * as React from "react";
import { FC } from "react";

export const SignInPage: FC = () => {
  return (
    <div className={"w-screen h-screen bg-purple-800 flex flex-row"}>
      <div className={"backdrop-blur-md bg-white/10 w-6/12 h-full"}>
        <button className={"btn-primary"}>
          CLick me
        </button>
      </div>
      <div className={"w-6/12 h-full flex flex-col justify-center"}>
        <div className={"text-7xl font-bold text-white flex justify-center"}>
          ANIMATE EVERYTHING
        </div>
      </div>
    </div>
  );
};