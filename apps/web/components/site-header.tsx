import { cookies } from "next/headers";

import { prisma, type User } from "@/lib/database";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchInHeader } from "@/components/search";
import { UserNav } from "@/components/user-nav";

export const SiteHeader: React.FC = async () => {
  const uid = cookies().get("uid")?.value;
  const user: User | null = uid
    ? await prisma.user.findUnique({ where: { id: parseInt(uid) } })
    : null;

  return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <div className="w-full flex-1 md:max-w-[250px] md:flex-none">
            <SearchInHeader />
          </div>
          <nav className="flex items-center space-x-1">
            <ModeToggle />
            <UserNav user={user} />
          </nav>
        </div>
      </div>
    </header>
  );
};
