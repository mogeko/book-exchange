import {
  LuBookOpen,
  LuLayoutGrid,
  LuLibrary,
  LuList,
  LuPenTool,
  LuUser,
} from "react-icons/lu";

import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuButton } from "@/app/(core)/_components/menu-button";

export const AsideMenu: React.FC = async () => {
  const { uid } = await loginedUserStatus();
  const booklists = await prisma.booklist.findMany({
    where: { userId: uid },
  });

  return (
    <aside className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <MenuButton href="/">
              <LuBookOpen className="mr-2 h-4 w-4" />
              Read Now
            </MenuButton>
            <MenuButton href="/browse">
              <LuLayoutGrid className="mr-2 h-4 w-4" />
              Browse
            </MenuButton>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Library
          </h2>
          <div className="space-y-1">
            <MenuButton href="/booklist">
              <LuList className="mr-2 h-4 w-4" />
              Book Lists
            </MenuButton>
            <MenuButton href="/made4u">
              <LuUser className="mr-2 h-4 w-4" />
              Made For You
            </MenuButton>
            <MenuButton href="/authors">
              <LuPenTool className="mr-2 h-4 w-4" />
              Authors
            </MenuButton>
            <MenuButton href="/series">
              <LuLibrary className="mr-2 h-4 w-4" />
              Series
            </MenuButton>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Book lists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            {booklists.map((booklist, i) => (
              <MenuButton
                href={`/booklist/${booklist.id}`}
                key={`aside-booklist-${i}`}
              >
                <LuList className="mr-2 h-4 w-4" />
                {booklist.title}
              </MenuButton>
            ))}
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
};
