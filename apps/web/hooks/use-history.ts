"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";

import { useLocalStorage } from "@/hooks/use-localstorage";

export function useHistory<T>(uid: number, initialValue = [] as T[]) {
  const [sKey, init] = [`${uid}-s-history`, JSON.stringify(initialValue)];
  const [storage, setStorage] = useLocalStorage(sKey, init);

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
