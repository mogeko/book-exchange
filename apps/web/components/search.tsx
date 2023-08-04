"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LuBook, LuSearch } from "react-icons/lu";
import { RxLaptop, RxMoon, RxSun } from "react-icons/rx";

import { cn } from "@/lib/utils";
import { useSearch } from "@/hooks/use-search";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export const SearchInHeader: React.FC<
  React.ComponentPropsWithoutRef<typeof Search>
> = (props) => {
  const pathname = usePathname();

  if (pathname === "/login") return <div />;
  return <Search {...props} />;
};

export const Search: React.FC<
  Omit<React.ComponentPropsWithoutRef<typeof Button>, "variant">
> = ({ className, ...props }) => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const { data, isLoading, isEmpty } = useSearch(searchValue);
  const router = useRouter();
  const { setTheme } = useTheme();

  const jumpTo = useCallback(
    (id: number) => {
      setOpen(false), setSearchValue("");
      router.push(`/book/${id}`);
    },
    [router, setOpen, setSearchValue]
  );
  const changeThemeTo = useCallback(
    (theme: string) => (setOpen(false), setTheme(theme)),
    [setOpen, setTheme]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault(), setOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn("justify-between gap-4 w-full", className)}
        onClick={() => setOpen((open) => !open)}
        {...props}
      >
        <div className="inline-flex items-center justify-between flex-row">
          <LuSearch className="mr-2 h-4 w-4" />
          <span>Search...</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">&#x2318;</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={(value) => setSearchValue(value)}
        />
        <CommandList>
          {isEmpty && <CommandEmpty>No books found</CommandEmpty>}
          {isLoading && <CommandItem>Searching books...</CommandItem>}
          {data?.map(({ id, title }) => (
            <CommandItem
              key={`search-book-${id}`}
              onSelect={() => jumpTo(id)}
              value={title}
            >
              <LuBook className="mr-2 h-4 w-4" />
              <span>{title}</span>
            </CommandItem>
          ))}
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => changeThemeTo("light")}>
              <RxSun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => changeThemeTo("dark")}>
              <RxMoon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => changeThemeTo("system")}>
              <RxLaptop className="mr-2 h-4 w-4" />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
