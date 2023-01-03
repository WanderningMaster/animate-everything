import { useCards } from "providers/card-provider";
import React, { FC, useRef } from "react";

export const SearchInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearch } = useCards();

  const handleClickSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (inputRef) {
      setSearch(inputRef.current?.value);
    }
  };

  return (
    <form>
      <div className="flex">
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full h-16 z-20 text-xl text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search..."
          />
          <button
            onClick={handleClickSubmit}
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-slate-600 rounded-r-lg hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              aria-hidden="true"
              className="w-14 h-[44px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};
