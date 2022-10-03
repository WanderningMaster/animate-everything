import { FC } from "react";

export const SignInForm: FC = () => {
  return (
    <>
      <form className={"flex flex-col justify-center w-full"}>
        <label className={"text-white px-4"}>Email</label>
        <input className={"input"} placeholder={"Email"} />
        <label className={"text-white px-4"}>Password</label>
        <input className={"input"} type={"password"} placeholder={"Password"} />
        <button className={"btn-primary"}>Sign in</button>
      </form>
      <div className={"link mt-3"}>
        Forgot your password?
      </div>
    </>
  );
};