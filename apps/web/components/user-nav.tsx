"use client";

import { useCallback, useEffect, useTransition } from "react";
import { logout } from "@/actions/authorization";

import type { User } from "@/lib/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserNav: React.FC<{ user: User | null }> = ({ user }) => {
  const [_isPending, startTransition] = useTransition();
  const handleLogout = useCallback(() => {
    startTransition(() => logout());
  }, [startTransition]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "P" && e.metaKey && e.shiftKey) {
        // TODO: Open Profile page
      } else if (e.key === "B" && e.metaKey) {
        // TODO: Open Book list page
      } else if (e.key === "W" && e.metaKey && e.shiftKey) {
        // TODO: Open Wishlist page
      } else if (e.key === "C" && e.metaKey && e.shiftKey) {
        // TODO: Open Comment page
      } else if (e.key === "F" && e.metaKey && e.shiftKey) {
        // TODO: Open Follow page
      } else if (e.key === "Q" && e.metaKey && e.shiftKey && e.ctrlKey) {
        handleLogout();
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [handleLogout]);

  if (!user) return <div />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Your Profile
          <DropdownMenuShortcut>&#x21E7;&#x2318;P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Your Book lists
            <DropdownMenuShortcut>&#x2318;B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Your Wishlist
            <DropdownMenuShortcut>&#x21E7;&#x2318;W</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Your Comment
            <DropdownMenuShortcut>&#x21E7;&#x2318;C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Your Following
            <DropdownMenuShortcut>&#x21E7;&#x2318;F</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Logout
          <DropdownMenuShortcut>&#x2303;&#x21E7;&#x2318;Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
