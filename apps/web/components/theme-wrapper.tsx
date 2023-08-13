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
    (theme: React.SetStateAction<ThemeValueType>) => {
      if (typeof theme === "function") {
        setTheme((currentTheme) => theme(currentTheme));
      } else {
        theme.mode && setMode(theme.mode);
        theme.color && setColor(theme.color);
      }
    },
    [setMode, setColor]
  );

  const applyMode = useCallback((mode: string) => {
    document.documentElement.classList.add(mode);
    document.documentElement.style.colorScheme = mode;
  }, []);

  const applyColor = useCallback((color: string) => {
    document.documentElement.classList.add(`theme-${color}`);
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
    applyColor(color);
  }, [applyColor, applyMode, color, handleMediaQuery, mode]);

  // Listen for changes from the OS System preferences
  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");

    match.addEventListener("change", handleMediaQuery);

    return () => match.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

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
        __html:
          "!function(){try{var d=document.documentElement,c=d.classList;var e=localStorage.getItem('theme-mode');var f=localStorage.getItem('theme-color');d.setAttribute('class','');if('system'===e||(!e&&true)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme='dark';c.add('dark')}else{d.style.colorScheme='light';c.add('light')}}else if(e){c.add(e||'')}c.add('theme-'+(f||'zinc'));if(e==='light'||e==='dark')d.style.colorScheme=e;}catch(e){}}()",
      }}
      nonce={nonce}
    />
  ),
  () => true // never re-render
);
ThemeScript.displayName = "ThemeScript";

type ThemeValueType = { mode?: string; color?: string };
