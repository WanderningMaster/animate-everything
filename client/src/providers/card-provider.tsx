/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";

type GifListType = Array<{
  id: string;
  src: string;
  author: string;
  authorId: string;
  avatar: string;
  isFavorite: boolean;
}>;

interface CardContextType {
  cards: GifListType | undefined;
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCards: React.Dispatch<React.SetStateAction<GifListType | undefined>>;
}

export const CardsContext = createContext<CardContextType>({} as CardContextType);

export const CardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [cards, setCards] = useState<GifListType | undefined>(undefined);

  const memoedData = useMemo(
    () => ({
      search,
      cards,
      setSearch,
      setCards,
    }),
    [search, cards, setSearch, setCards],
  );

  return <CardsContext.Provider value={memoedData}>{children}</CardsContext.Provider>;
};

export const useCards = (): {
  cards: GifListType | undefined;
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCards: React.Dispatch<React.SetStateAction<GifListType | undefined>>;
} => {
  const { search, cards, setCards, setSearch } = useContext(CardsContext);

  return {
    search,
    cards,
    setCards,
    setSearch,
  };
};
