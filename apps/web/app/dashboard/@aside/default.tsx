import { cookies } from "next/headers";
import {
  LuBookOpen,
  LuLayoutGrid,
  LuLibrary,
  LuList,
  LuPenTool,
  LuUser,
} from "react-icons/lu";

import { prisma } from "@/lib/database";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuButton } from "@/app/dashboard/@aside/_components/menu-button";

const AsideMenu: React.FC = async () => {
  const uid = cookies().get("uid")?.value;
  const booklists = await prisma.booklist.findMany({
    where: { userId: uid ? parseInt(uid) : void 0 },
  });

  return (
    <aside className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <MenuButton href={`/dashboard/${uid}`}>
              <LuBookOpen className="mr-2 h-4 w-4" />
              Read Now
            </MenuButton>
            <MenuButton href="/dashboard/browse">
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
            <MenuButton href={`/dashboard/${uid}/booklists`}>
              <LuList className="mr-2 h-4 w-4" />
              Book Lists
            </MenuButton>
            <MenuButton href={`/dashboard/${uid}/made4u`}>
              <LuUser className="mr-2 h-4 w-4" />
              Made For You
            </MenuButton>
            <MenuButton href={`/dashboard/${uid}/authors`}>
              <LuPenTool className="mr-2 h-4 w-4" />
              Authors
            </MenuButton>
            <MenuButton href={`/dashboard/${uid}/series`}>
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
                href={`/dashboard/${uid}/booklists/${booklist.id}`}
                key={`booklist-${i}`}
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

export default AsideMenu;
