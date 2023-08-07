"use client";

import { useCallback, useMemo } from "react";

import { useLocalStorage } from "@/hooks/use-localstorage";

export function useHistory<T>(initialValue = [] as T[]) {
  const init = JSON.stringify(initialValue);
  const [storage, setStorage] = useLocalStorage("search-history", init);

  const history = useMemo(() => JSON.parse(storage), [storage]) as T[];

  const setHistory: React.Dispatch<React.SetStateAction<T[]>> = useCallback(
    (newHistory) => {
      if (typeof newHistory === "function") {
        setStorage(JSON.stringify(newHistory(history)));
      } else {
        setStorage(JSON.stringify(newHistory));
      }
    },
    [history, setStorage]
  );

  return { history, setHistory };
}
