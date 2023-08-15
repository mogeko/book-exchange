"use client";

import { createContext, memo, useCallback, useEffect } from "react";

import { useLocalStorage } from "@/hooks/use-localstorage";

export const ThemeContext = createContext<{
  setTheme: React.Dispatch<React.SetStateAction<ThemeValueType>>;
  theme: ThemeValueType;
}>({ theme: { mode: "system", color: "zinc" }, setTheme: (_) => {} });

export const ThemeProvider: React.FC<
  React.PropsWithChildren<{ defaultTheme?: ThemeValueType }>
> = ({ children, defaultTheme = { mode: "system", color: "zinc" } }) => {
  const [mode, setMode] = useLocalStorage("theme-mode", defaultTheme.mode);
  const [color, setColor] = useLocalStorage("theme-color", defaultTheme.color);

  const setTheme = useCallback(
    (newTheme: React.SetStateAction<ThemeValueType>) => {
      if (typeof newTheme === "function") {
        setTheme((currentTheme) => newTheme(currentTheme));
      } else {
        newTheme.mode && setMode(newTheme.mode);
        newTheme.color && setColor(newTheme.color);
      }
    },
    [setMode, setColor]
  );

  const applyMode = useCallback((mode: string) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(mode);
    document.documentElement.style.colorScheme = mode;
  }, []);

  const handleMediaQuery = useCallback(() => {
    const query = "(prefers-color-scheme: dark)";
    const { media, matches } = window.matchMedia(query);

    applyMode(media !== query || matches ? "dark" : "light");
  }, [applyMode]);

  // When theme changes, apply it to the <html> element
  useEffect(() => {
    document.documentElement.setAttribute("class", "");
    ["light", "dark"].includes(mode) ? applyMode(mode) : handleMediaQuery();
    document.documentElement.classList.add(`theme-${color}`);
  }, [applyMode, color, handleMediaQuery, mode]);

  // Listen for changes from the OS System preferences
  useEffect(() => {
    if (mode === "system") {
      const match = window.matchMedia("(prefers-color-scheme: dark)");

      match.addEventListener("change", handleMediaQuery);

      return () => match.removeEventListener("change", handleMediaQuery);
    }
  }, [handleMediaQuery, mode]);

  return (
    <ThemeContext.Provider
      value={{ theme: { mode, color }, setTheme: setTheme }}
    >
      <ThemeScript />
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeScript = memo(
  ({ nonce }: { nonce?: string }) => (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(){try{var e=document.documentElement,t=e.classList,a=localStorage.getItem("theme-mode"),c=localStorage.getItem("theme-color");if(e.setAttribute("class",""),"system"!==a&&a)a&&t.add(a||"");else{var l="(prefers-color-scheme: dark)",o=window.matchMedia(l);o.media!==l||o.matches?(e.style.colorScheme="dark",t.add("dark")):(e.style.colorScheme="light",t.add("light"))}t.add("theme-"+(c||"zinc")),"light"!==a&&"dark"!==a||(e.style.colorScheme=a)}catch(a){}}();`,
      }}
      nonce={nonce}
    />
  ),
  () => true // never re-render
);
ThemeScript.displayName = "ThemeScript";

type ThemeValueType = { mode?: string; color?: string };
