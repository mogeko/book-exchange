"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LuBook, LuLoader2, LuSearch, LuTrash2 } from "react-icons/lu";
import { RxLaptop, RxMoon, RxSun } from "react-icons/rx";

import { cn } from "@/lib/utils";
import { useHistory } from "@/hooks/use-history";
import { useSearch, type Book } from "@/hooks/use-search";
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
  const [history, setHistory] = useHistory<Book>("search-history");
  const { data, isLoading } = useSearch(searchValue);
  const router = useRouter();
  const { setTheme } = useTheme();

  const jumpTo = useCallback(
    (id: number, title: string) => {
      setOpen(false), setSearchValue(""); // reset Search Dialog
      setHistory((history) => {
        if (!history.find((book) => book.id === id)) {
          history.push({ id, title });
        }

        return history;
      }); // update history
      router.push(`/book/${id}`); // direct to book page
    },
    [router, setOpen, setSearchValue, setHistory]
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
  }, [setOpen, data]);

  const SearchResults = useMemo(() => {
    if (isLoading) {
      return (
        <CommandPlainText className="text-muted-foreground">
          <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Searching books...</span>
        </CommandPlainText>
      );
    }

    const books = history.concat(
      data?.filter(({ id }) => {
        return !history.find((book) => book.id === id);
      }) ?? []
    );

    if (!books.length) {
      return <CommandPlainText>No history here</CommandPlainText>;
    }

    return (
      <>
        {books.map(({ id, title }) => (
          <CommandItem
            key={`search-book-${id}`}
            onSelect={() => jumpTo(id, title)}
            value={title}
          >
            <LuBook className="mr-2 h-4 w-4" />
            <span>{title}</span>
          </CommandItem>
        ))}
        <CommandItem onSelect={() => setHistory([])}>
          <LuTrash2 className="mr-2 h-4 w-4" />
          <span>Clear all history</span>
        </CommandItem>
      </>
    );
  }, [isLoading, history, data, jumpTo]);

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
          <CommandEmpty>No command or books found</CommandEmpty>
          <CommandGroup heading="History or results">
            {SearchResults}
          </CommandGroup>
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

const CommandPlainText: React.FC<
  {} & React.ButtonHTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex select-none items-center justify-center py-3 text-sm outline-none",
        className
      )}
      {...props}
    />
  );
};
