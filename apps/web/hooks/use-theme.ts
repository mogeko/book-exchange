"use client";

import { use, useCallback } from "react";

import { ThemeContext } from "@/components/theme-context";

export function useTheme(): UseTheme<{ mode?: string; color?: string }>;
export function useTheme(type: "color" | "mode"): UseTheme<string>;
export function useTheme(type?: "mode" | "color") {
  const { theme, setMode, setColor } = use(ThemeContext);

  if (type === "mode") {
    return { theme: theme.mode, setTheme: setMode };
  }
  if (type === "color") {
    return { theme: theme.color, setTheme: setColor };
  }

  const setTheme = useCallback(
    (value: React.SetStateAction<typeof theme>) => {
      if (typeof value === "function") {
        setTheme(value(theme));
      } else {
        setColor((color) => value.color ?? color);
        setMode((mode) => value.mode ?? mode);
      }
    },
    [setColor, setMode, theme]
  );

  return { theme, setTheme };
}

type UseTheme<T> = {
  setTheme: React.Dispatch<React.SetStateAction<T>>;
  theme: T;
};
