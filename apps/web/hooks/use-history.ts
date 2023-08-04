"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";

import { useLocalStorage } from "@/hooks/use-localstorage";

export function useHistory<T>(sKey: string, init = [] as T[]) {
  const [storage, setStorage] = useLocalStorage(sKey, JSON.stringify(init));

  const searchHistory = useMemo(() => JSON.parse(storage), [storage]) as T[];

  const setSearchHistory: Dispatch<SetStateAction<T[]>> = (history) => {
    if (typeof history === "function") {
      setStorage(JSON.stringify(history(searchHistory)));
    } else {
      setStorage(JSON.stringify(history));
    }
  };

  return [searchHistory, setSearchHistory] as const;
}
