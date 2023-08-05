"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export function useLocalStorage(storageKey: string, initialValue = "") {
  const [value, setValue] = useState(initialValue);

  // In order to ensure that `window.*` code runs only in the client
  // See: https://github.com/vercel/next.js/discussions/19911
  useEffect(() => {
    setValue(window.localStorage.getItem(storageKey) || initialValue);
  }, [storageKey, initialValue]);

  const setLocalStorage: Dispatch<SetStateAction<string>> = (newValue) => {
    if (typeof newValue === "function") {
      return setLocalStorage(newValue(value));
    } else {
      setValue(newValue); // Update state first to avoid repeated modifications

      if (newValue === initialValue) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(storageKey, newValue);
      }
    }
  };

  // Update the state if the localStorage value changes
  const handleStorage = useCallback(
    (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      if (e.newValue !== value) setValue(e.newValue || initialValue);
    },
    [value, initialValue, storageKey]
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [handleStorage]);

  return [value, setLocalStorage] as const;
}
