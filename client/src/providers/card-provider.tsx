/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";
import { GifResponseDto } from "shared/build";

type GifListType = Array<GifResponseDto & { isLiked: boolean }>;

interface CardContextType {
  cards: GifListType | undefined;
  search: string | undefined;
  pagination: { take: number; skip: number };
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCards: React.Dispatch<React.SetStateAction<GifListType | undefined>>;
  setPagination: React.Dispatch<React.SetStateAction<{ take: number; skip: number }>>;
  setTriggerReset: React.Dispatch<React.SetStateAction<boolean>>;
  triggerReset: boolean;
}

export const CardsContext = createContext<CardContextType>({} as CardContextType);

export const CardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [triggerReset, setTriggerReset] = useState(true);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [itemCount, setItemCount] = useState<number>(0);
  const [pagination, setPagination] = useState<{ take: number; skip: number }>({
    take: 6,
    skip: 0,
  });
  const [cards, setCards] = useState<GifListType | undefined>(undefined);

  const memoedData = useMemo(
    () => ({
      search,
      cards,
      setSearch,
      setCards,
      setPagination,
      setItemCount,
      pagination,
      itemCount,
      setTriggerReset,
      triggerReset,
    }),
    [
      search,
      cards,
      pagination,
      setPagination,
      setSearch,
      setCards,
      setItemCount,
      itemCount,
      setTriggerReset,
      triggerReset,
    ],
  );

  return <CardsContext.Provider value={memoedData}>{children}</CardsContext.Provider>;
};

export const useCards = (): {
  cards: GifListType | undefined;
  search: string | undefined;
  pagination: { take: number; skip: number };
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCards: React.Dispatch<React.SetStateAction<GifListType | undefined>>;
  setPagination: React.Dispatch<React.SetStateAction<{ take: number; skip: number }>>;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
  setTriggerReset: React.Dispatch<React.SetStateAction<boolean>>;
  triggerReset: boolean;
} => {
  const {
    search,
    cards,
    setCards,
    setSearch,
    pagination,
    setPagination,
    setItemCount,
    itemCount,
    triggerReset,
    setTriggerReset,
  } = useContext(CardsContext);

  return {
    search,
    cards,
    setCards,
    setSearch,
    pagination,
    setPagination,
    setItemCount,
    itemCount,
    triggerReset,
    setTriggerReset,
  };
};
