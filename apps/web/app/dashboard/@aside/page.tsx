"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  LuBookOpen,
  LuLayoutGrid,
  LuLibrary,
  LuList,
  LuPenTool,
  LuUser,
} from "react-icons/lu";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AsideMenu: React.FC = () => {
  const booklists = [] as any[]; // TODO: get booklists

  return (
    <aside className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <MenuButton href="/dashboard">
              <LuBookOpen className="w-4 h-4 mr-2" />
              Read Now
            </MenuButton>
            <MenuButton href="/dashboard/browse">
              <LuLayoutGrid className="w-4 h-4 mr-2" />
              Browse
            </MenuButton>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            <MenuButton href="/dashboard/booklists" /** TODO: with user id */>
              <LuList className="w-4 h-4 mr-2" />
              Book Lists
            </MenuButton>
            <MenuButton href="/dashboard/made4u" /** TODO: with user id */>
              <LuUser className="w-4 h-4 mr-2" />
              Made For You
            </MenuButton>
            <MenuButton href="/dashboard/authors" /** TODO: with user id */>
              <LuPenTool className="w-4 h-4 mr-2" />
              Authors
            </MenuButton>
            <MenuButton href="/dashboard/series" /** TODO: with user id */>
              <LuLibrary className="w-4 h-4 mr-2" />
              Series
            </MenuButton>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea>
            {booklists.map((booklist, i) => (
              <MenuButton
                href={`/booklists/${booklist.id}`}
                key={`booklist-${i}`}
              >
                <LuList className="w-4 h-4 mr-2" />
                {booklist.name}
              </MenuButton>
            ))}
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
};

const MenuButton: React.FC<
  {
    variant?: "secondary" | "ghost";
  } & React.ComponentProps<typeof Link>
> = ({ className, variant, href, ...props }) => {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        buttonVariants({
          variant: variant ?? (pathname === href ? "secondary" : "ghost"),
        }),
        "w-full justify-start"
      )}
      href={href}
      {...props}
    />
  );
};

export default AsideMenu;
