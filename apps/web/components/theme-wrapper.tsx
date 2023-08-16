"use client";

import { usePathname } from "next/navigation";

import { ThemeProvider } from "@/components/theme-context";

export const ThemeWrapper: React.FC<
  React.ComponentPropsWithoutRef<typeof ThemeProvider>
> = ({ forcedMode, ...props }) => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <ThemeProvider forcedMode="dark" {...props} />;
  }
  if (pathname.startsWith("/login/signup")) {
    return <ThemeProvider forcedMode="light" {...props} />;
  }

  return <ThemeProvider forcedMode={forcedMode} {...props} />;
};
