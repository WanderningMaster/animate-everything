import * as React from "react";
import { FC, useState } from "react";
import { SignUpForm } from "./common/sign-up-form";
import { SignInForm } from "./common/sign-in-form";

export const SignInPage: FC = () => {

  const [isSignIn, setIsSignIn] = useState(true);

  const handleClickSignIn = (): void => {
    setIsSignIn(true);
  };

  const handleClickSignUp = (): void => {
    setIsSignIn(false);
  };

  return (
    <div className={"w-screen h-screen bg-purple-700 flex flex-row"}>
      <div className={"flex justify-center backdrop-blur-xl bg-white/10 w-6/12 h-full"}>
        <div className={"flex flex-col w-96 justify-center items-center"}>
          <div className={"flex flex-row justify-between items-center rounded-3xl bg-gray-700 w-full h-10 mb-3"}>
            <div
              onClick={handleClickSignIn}
              className={`flex justify-center cursor-pointer items-center rounded-3xl w-6/12 h-full ${isSignIn && "bg-blue-600"} text-white font-bold`}>
              Sign in
            </div>
            <div
              onClick={handleClickSignUp}
              className={`flex justify-center cursor-pointer items-center rounded-3xl w-6/12 h-full ${!isSignIn && "bg-blue-600"} text-white font-bold`}>
              Sign up
            </div>
          </div>
          {isSignIn ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
      <div className={"pl-10 w-6/12 h-full flex flex-col justify-center"}>
        <div className={"text-7xl font-bold text-white flex justify-start"}>
          ANIMATE
        </div>
        <div className={"text-7xl font-bold text-white flex justify-start"}>
          EVERYTHING
        </div>
      </div>
    </div>
  );
};