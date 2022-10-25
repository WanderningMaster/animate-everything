import React, { ReactElement } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "date" | "password";
  disabled?: boolean;
  onFocus?: () => void;
};

export const Input = <T extends FieldValues>({
                                               control,
                                               name,
                                               label,
                                               placeholder,
                                               type,
                                               disabled,
                                               onFocus,
                                             }: InputProps<T>): ReactElement | null => {
  const { field, fieldState: { error } } = useController({ name, control });
  
  return (
    <div className={"flex flex-col"}>
      <label className={"text-white px-4 flex flex-row justify-between"}>
        <div>{label}</div>
        {error && <div className={"text-red-300"}>{error.message}</div>}
      </label>
      <input  {...field} className={"input"} type={type} onFocus={onFocus} disabled={disabled}
              placeholder={placeholder} />
    </div>
  );
};
