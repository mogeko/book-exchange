import { notFound } from "next/navigation";
import { LuBan, LuMoreHorizontal } from "react-icons/lu";

import { prisma } from "@/lib/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FollowButton } from "@/app/(core)/user/[uid]/_components/follow-button";

const UserPage: React.FC<{
  params: { uid: string };
}> = async ({ params: { uid } }) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(uid) },
    include: { profile: true },
  });

  if (!user) notFound();
  return (
    <div className="flex flex-col items-stretch justify-stretch">
      <section className="bg-secondary flex flex-col">
        <div className="flex h-[300px] flex-col items-center justify-center">
          <Avatar className="aspect-square h-[150px] w-[150px]">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-end justify-between px-6 pb-6">
          <div className="flex flex-col">
            <h2 className="scroll-m-20 text-5xl font-extrabold tracking-tight">
              {user.name}
            </h2>
          </div>
          <div className="flex flex-row gap-4">
            <FollowButton uid={parseInt(uid)} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-9 w-9 rounded-full" size={null}>
                  <LuMoreHorizontal className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <LuBan className="mr-2 h-4 w-4" />
                  Add to the blacklist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      <div></div>
    </div>
  );
};

export default UserPage;
