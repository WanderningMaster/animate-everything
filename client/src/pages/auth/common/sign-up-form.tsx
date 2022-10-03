import * as React from "react";
import { FC } from "react";

export const SignUpForm: FC = () => {
  return (
    <>
      <form className={"flex flex-col justify-center w-full"}>
        <label className={"text-white px-4"}>Email</label>
        <input className={"input"} placeholder={"Email"} />
        <label className={"text-white px-4"}>Username</label>
        <input className={"input"} placeholder={"Username"} />
        <label className={"text-white px-4"}>Password</label>
        <input className={"input"} type={"password"} placeholder={"Password"} />
        <label className={"text-white px-4"}>Confirm Password</label>
        <input className={"input"} type={"password"} placeholder={"Confirm your password"} />
        <button className={"btn-primary"}>Sign up</button>
      </form>
      <div className={"link mt-3"}>
        Already have account?
      </div>
    </>
  );
};