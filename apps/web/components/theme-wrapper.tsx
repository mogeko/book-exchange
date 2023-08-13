"use client";

import { createContext, memo, useCallback, useEffect } from "react";

import { useLocalStorage } from "@/hooks/use-localstorage";

export const ThemeContext = createContext<{
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}>({ theme: "system", setTheme: (_) => {} });

export const ThemeProvider: React.FC<
  React.PropsWithChildren<{ defaultTheme?: string }>
> = ({ children, defaultTheme = "system" }) => {
  const [theme, setTheme] = useLocalStorage("theme-mode", defaultTheme);

  const applyTheme = useCallback((theme: string) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  }, []);

  const handleMediaQuery = useCallback(() => {
    const query = "(prefers-color-scheme: dark)";
    const { media, matches } = window.matchMedia(query);

    applyTheme(media !== query || matches ? "dark" : "light");
  }, [applyTheme]);

  // When theme changes, apply it to the <html> element
  useEffect(() => {
    ["light", "dark"].includes(theme) ? applyTheme(theme) : handleMediaQuery();
  }, [theme, applyTheme, handleMediaQuery]);

  // Listen for changes from the OS System preferences
  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");

    match.addEventListener("change", handleMediaQuery);

    return () => match.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
          "!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme-mode');if('system'===e||(!e&&true)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme = 'dark';c.add('dark')}else{d.style.colorScheme = 'light';c.add('light')}}else if(e){c.add(e|| '')}if(e==='light'||e==='dark')d.style.colorScheme=e}catch(e){}}()",
      }}
      nonce={nonce}
    />
  ),
  () => true // never re-render
);
ThemeScript.displayName = "ThemeScript";
