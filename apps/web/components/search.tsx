"use client";

import { useEffect } from "react";
import { LuSearch } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Search: React.FC<{ className?: string }> = ({ className }) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        // TODO: Open Search Dialog
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <Button
      variant="outline"
      className={cn("justify-between gap-4 w-full", className)}
    >
      <div className="inline-flex items-center justify-between flex-row">
        <LuSearch className="mr-2 h-4 w-4" />
        <span>Search...</span>
      </div>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">&#x2318;</span>K
      </kbd>
    </Button>
  );
};
