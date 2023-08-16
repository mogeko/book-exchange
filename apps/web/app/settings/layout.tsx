import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/app/settings/_components/sidebar-nav";

const SettingsLayout: React.FC<{
  children: React.ReactNode;
}> = async ({ children }) => {
  const { uid } = await loginedUserStatus();
  const user = await prisma.user.findUnique({
    where: { id: uid },
    select: { id: true, name: true, avatar: true },
  });

  if (!user) redirect("/login");
  return (
    <>
      <SiteHeader />
      <div className="mx-10 block flex-1 space-y-6 p-10 pb-16">
        <div className="flex flex-row items-center justify-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <Link
              className="text-2xl font-bold tracking-tight"
              href={`/user/${user.id}`}
            >
              {user.name}
              <span className="text-muted-foreground">{`#${user.id}`}</span>
            </Link>
            <p className="text-muted-foreground">
              Manage your personal account and setting the web application.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
};

export default SettingsLayout;
