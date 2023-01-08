import { Typography } from "components/common/typography";
import React, { useEffect, useRef, FC } from "react";
import { formatSeconds } from "utils";

type RangeSliderProps = {
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  step: number;
  setValue: React.Dispatch<
    React.SetStateAction<{
      left: number;
      right: number;
    }>
  >;
};

export const RangeSlider: FC<RangeSliderProps> = ({ initialMin, initialMax, min, max, step, setValue }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (parseInt(e.target.value) > initialMax) {
      return;
    }
    setValue((state) => ({ left: parseInt(e.target.value), right: state.right }));
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (parseInt(e.target.value) < initialMin) {
      return;
    }
    setValue((state) => ({ left: state.left, right: parseInt(e.target.value) }));
  };

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = (initialMin / max) * step + "%";
      progressRef.current.style.right = step - (initialMax / max) * step + "%";
    }
  }, [initialMin, initialMax, max, step]);

  return (
    <div className="">
      <div className="slider relative h-1 rounded-md bg-gray-300">
        <div className="progress absolute h-1 bg-green-300 rounded " ref={progressRef} />
      </div>
      <div className="range-input relative  ">
        <input
          onChange={handleMin}
          type="range"
          min={min}
          step={step}
          max={max}
          value={initialMin}
          className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
        />

        <input
          onChange={handleMax}
          type="range"
          min={min}
          step={step}
          max={max}
          value={initialMax}
          className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
        />
      </div>

      <div className=" pt-4 w-full flex flex-row justify-between">
        <div>
          <Typography text={formatSeconds(initialMin)} />
        </div>
        <div>
          <Typography text={formatSeconds(initialMax)} />
        </div>
      </div>
    </div>
  );
};
