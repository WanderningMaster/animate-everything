import { Link } from "components/common";
import { Typography } from "components/common/typography";
import React, { FC, useEffect, useRef, useState } from "react";
import { AppRoute } from "shared/build";
import { ReactComponent as ArrowDown } from "assets/images/arrow-down.svg";
import { ReactComponent as ArrowUp } from "assets/images/arrow-up.svg";

type ProfileButoonProps = {
  avatar: string;
  author: string;
};

export const ProfileButton: FC<ProfileButoonProps> = ({ author, avatar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (event.target instanceof HTMLElement && ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClick = (): void => {
    setIsOpen((state) => !state);
  };
  return (
    <div ref={ref} onClick={handleClick}>
      <div className="flex items-center space-x-4 py-2 px-4 h-full w-full bg-slate-600 text-white font-semibold shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 rounded cursor-pointer">
        <img className="w-9" src={avatar} />
        <Typography bold text={author} />
        <div className="w-9">{isOpen ? <ArrowUp className="fill-white" /> : <ArrowDown className="fill-white" />}</div>
      </div>

      <div
        className={`rounded ${isOpen ? "visible" : "hidden"} absolute top-24 hover:flex
         z-50 w-[14%]
         flex-col bg-slate-700 drop-shadow-xl divide-solid`}
      >
        <Link to={AppRoute.ROOT} className={"text-lg text-slate-200 hover:text-white font-bold"}>
          <div className="px-5 py-3">{"Favorites"}</div>
        </Link>
        <Link to={AppRoute.ROOT} className={"text-lg text-slate-200 hover:text-white font-bold"}>
          <div className=" px-5 py-3">{"Settings"}</div>
        </Link>
        <Link to={AppRoute.ROOT} className={"text-lg text-slate-200 hover:text-white font-bold"}>
          <div className="px-5 py-3">{"Sign out"}</div>
        </Link>
      </div>
    </div>
  );
};
