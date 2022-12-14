import { FC, useEffect, useState } from "react";
import { SignUpForm, SignUpFormValues } from "./common/sign-up-form";
import { SignInForm, SignInFormValues } from "./common/sign-in-form";
import { useSignUp } from "api/api";
import { useAuth } from "hooks/use-auth-hook";
import { toast, Id } from "react-toastify";

export const Auth: FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signInAsync } = useAuth();
  const { isSuccess: isSuccessSignUp, mutateAsync: signUpAsync } = useSignUp();

  const handleClickSignIn = (): void => {
    setIsSignIn(true);
  };

  const handleClickSignUp = (): void => {
    setIsSignIn(false);
  };

  const onSignIn = async (formValues: SignInFormValues): Promise<void> => {
    await signInAsync(formValues);
  };

  const nofitySignUp = (): Id => toast("You successfully signed up");
  const onSignUp = async ({ username, password, email }: SignUpFormValues): Promise<void> => {
    await signUpAsync({
      username,
      password,
      email,
    });
    nofitySignUp();
  };

  useEffect(() => {
    if (isSuccessSignUp) {
      setIsSignIn(true);
    }
  }, [isSuccessSignUp]);

  return (
    <div className={"w-screen h-screen bg-slate-900 flex flex-row"}>
      <div className={"flex justify-center backdrop-blur-xl bg-white/10 w-5/12 h-full"}>
        <div className={"flex flex-col w-96 justify-center items-center"}>
          <div className={"flex flex-row justify-between items-center rounded-3xl bg-gray-700 w-full h-10 mb-3"}>
            <div
              onClick={handleClickSignIn}
              className={`flex justify-center cursor-pointer items-center rounded-3xl w-6/12 h-full ${
                isSignIn && "bg-slate-600"
              } text-white font-bold`}
            >
              Sign in
            </div>
            <div
              onClick={handleClickSignUp}
              className={`flex justify-center cursor-pointer items-center rounded-3xl w-6/12 h-full ${
                !isSignIn && "bg-slate-600"
              } text-white font-bold`}
            >
              Sign up
            </div>
          </div>
          {isSignIn ? (
            <SignInForm onSubmit={onSignIn} isLoading={false} />
          ) : (
            <SignUpForm onSubmit={onSignUp} isLoading={false} />
          )}
        </div>
      </div>
      <div className={"pl-10 w-6/12 h-full flex flex-col justify-center"}>
        <div className={"text-7xl font-bold text-white flex justify-start"}>ANIMATE</div>
        <div className={"text-7xl font-bold text-white flex justify-start"}>EVERYTHING</div>
      </div>
    </div>
  );
};
