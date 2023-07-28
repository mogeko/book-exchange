import "@/app/globals.css";

import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { sans } from "@/lib/font";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          sans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
