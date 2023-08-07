"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { LuBook, LuSearch, LuTrash2 } from "react-icons/lu";
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
  CommandShortcut,
} from "@/components/ui/command";

export const SearchInHeader: React.FC<
  {
    user: { id: number } | null;
  } & Omit<React.ComponentPropsWithoutRef<typeof Search>, "uid">
> = ({ user, ...props }) => {
  return <>{user && <Search uid={user.id} {...props} />}</>;
};

export const Search: React.FC<
  { uid: number } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, uid, ...props }) => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useHistory<Book>(uid);
  const { data } = useSearch(searchValue, history);
  const { setTheme } = useTheme();
  const router = useRouter();

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
  const clearHistory = useCallback(() => setHistory([]), [setHistory]);
  const changeThemeTo = useCallback(
    (theme: string) => (setOpen(false), setTheme(theme)),
    [setOpen, setTheme]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        e.preventDefault(), setOpen((open) => !open);
      }
      if (e.key === "Backspace" && e.metaKey) {
        e.preventDefault(), clearHistory();
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [setOpen, clearHistory]);

  return (
    <>
      <Button
        variant="outline"
        className={cn("w-full justify-between gap-4", className)}
        onClick={() => setOpen((open) => !open)}
        {...props}
      >
        <div className="inline-flex flex-row items-center justify-between">
          <LuSearch className="mr-2 h-4 w-4" />
          <span>Search...</span>
        </div>
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
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
            {data.map(({ id, title }) => (
              <CommandItem
                key={`search-book-${id}`}
                onSelect={() => jumpTo(id, title)}
                value={title}
              >
                <LuBook className="mr-2 h-4 w-4" />
                <span>{title}</span>
              </CommandItem>
            ))}
            {!history.length ? (
              !data.length && (
                <div className="relative flex select-none items-center justify-center py-3 text-sm outline-none">
                  No history here
                </div>
              )
            ) : (
              <CommandItem onSelect={clearHistory}>
                <LuTrash2 className="mr-2 h-4 w-4" />
                <span>Clear all history</span>
                <CommandShortcut>&#x2318;&#x232B;</CommandShortcut>
              </CommandItem>
            )}
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
