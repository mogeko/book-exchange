import "@/styles/globals.css";

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { sans } from "@/lib/font";
import { cn } from "@/lib/utils";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Toaster } from "@/components/toaster";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          sans.variable
        )}
      >
        <ThemeWrapper defaultTheme={{ mode: "system", color: "zinc" }}>
          <div className="relative flex min-h-screen flex-col">{children}</div>
        </ThemeWrapper>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
