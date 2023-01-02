import React, { ReactElement, useState } from "react";
import { Control, FieldValues, Path, UseFormSetValue } from "react-hook-form";

type ToggleProps<T extends FieldValues> = {
  control: Control<T>;
  defaultValue: boolean;
  name: Path<T>;
  disabled?: boolean;
  onFocus?: () => void;
  setValue: UseFormSetValue<
    Partial<{
      email: string;
      username: string;
      isPrivate: boolean;
    }>
  >;
};

export const Toggle = <T extends FieldValues>({ defaultValue, setValue }: ToggleProps<T>): ReactElement | null => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const handleClick = (): void => {
    setIsChecked((state) => !state);
    setValue("isPrivate", !isChecked);
  };

  return (
    <label className="inline-flex relative mb-4 mt-2 items-center cursor-pointer">
      <input onClick={handleClick} type="checkbox" checked={isChecked} value="" className="sr-only peer" />
      <div
        className={
          "w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"
        }
      ></div>
    </label>
  );
};
