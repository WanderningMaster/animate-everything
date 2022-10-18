import React, { FC } from "react";

type InputProps = {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "date" | "password";
  disabled?: boolean;
  onFocus?: () => void;
};

export const Input: FC<InputProps> = ({ label, placeholder, type, disabled, onFocus }) => {
  //TODO: add react form support
  return (
    <div className={"flex flex-col"}>
      <label className={"text-white px-4"}>
        <span>{label}</span>
      </label>
      <input className={"input"} type={type} onFocus={onFocus} disabled={disabled} placeholder={placeholder} />
    </div>
  );
};
