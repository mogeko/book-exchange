"use client";

import { createContext, memo, useCallback, useEffect } from "react";

import { useLocalStorage } from "@/hooks/use-localstorage";

export const ThemeContext = createContext<{
  theme: { mode?: string; color?: string };
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}>({
  theme: { mode: "system", color: "zinc" },
  setColor: (_) => {},
  setMode: (_) => {},
});

export const ThemeProvider: React.FC<
  React.PropsWithChildren<{
    defaultTheme?: React.ContextType<typeof ThemeContext>["theme"];
    forcedMode?: "light" | "dark";
  }>
> = ({ defaultTheme = { mode: "system", color: "zinc" }, ...props }) => {
  const [color, setColor] = useLocalStorage("theme-color", defaultTheme.color);
  const [mode, setMode] = useLocalStorage("theme-mode", defaultTheme.mode);

  const applyMode = useCallback((mode: string) => {
    if (["light", "dark"].includes(mode)) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(mode);
      document.documentElement.style.colorScheme = mode;
    }
  }, []);

  const handleMediaQuery = useCallback(
    ({ matches }: MediaQueryListEvent | MediaQueryList) => {
      applyMode(matches ? "dark" : "light");
    },
    [applyMode]
  );

  // When theme changes, apply it to the <html> element
  useEffect(() => {
    document.documentElement.setAttribute("class", "");
    if (mode === "system" && !props.forcedMode) {
      handleMediaQuery(window.matchMedia("(prefers-color-scheme: dark)"));
    } else {
      applyMode(props.forcedMode ?? mode);
    }
    document.documentElement.classList.add(`theme-${color}`);
  }, [mode, color, props.forcedMode, applyMode, handleMediaQuery]);

  // Listen for changes from the OS System preferences
  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");

    match.addEventListener("change", handleMediaQuery);

    return () => match.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  return (
    <ThemeContext.Provider
      value={{ theme: { mode, color }, setColor, setMode }}
    >
      <ThemeScript forcedMode={props.forcedMode} />
      {props.children}
    </ThemeContext.Provider>
  );
};

const ThemeScript = memo(
  (props: { nonce?: string; forcedMode?: "light" | "dark" }) => (
    <script
      dangerouslySetInnerHTML={{
        __html: props.forcedMode
          ? `!function(){var e=document.documentElement,t=e.classList,o=localStorage.getItem("theme-color");e.setAttribute("class",""),t.add("${props.forcedMode}"),e.style.colorScheme="${props.forcedMode}",t.add("theme-"+(o||"zinc"))}();`
          : `!function(){try{var e=document.documentElement,t=e.classList,a=localStorage.getItem("theme-mode"),c=localStorage.getItem("theme-color");if(e.setAttribute("class",""),"system"!==a&&a)a&&t.add(a||"");else{var l="(prefers-color-scheme: dark)",o=window.matchMedia(l);o.media!==l||o.matches?(e.style.colorScheme="dark",t.add("dark")):(e.style.colorScheme="light",t.add("light"))}t.add("theme-"+(c||"zinc")),"light"!==a&&"dark"!==a||(e.style.colorScheme=a)}catch(a){}}();`,
      }}
      nonce={props.nonce}
    />
  ),
  () => true // never re-render
);
ThemeScript.displayName = "ThemeScript";
