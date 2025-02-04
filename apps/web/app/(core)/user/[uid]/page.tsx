import { notFound } from "next/navigation";
import { LuBan, LuMoreHorizontal } from "react-icons/lu";

import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Comment, CommentFeeds } from "@/components/comment-context";
import { CommentEditor } from "@/components/comment-editor";
import { UserBooklists } from "@/app/(core)/user/[uid]/_components/booklists";
import { UserBookshelf } from "@/app/(core)/user/[uid]/_components/bookshelf";
import { FollowButton } from "@/app/(core)/user/[uid]/_components/follow-button";
import { setComment } from "@/app/(core)/user/[uid]/comment-actions";

const UserPage: React.FC<{
  params: { uid: string };
}> = async ({ params: { uid } }) => {
  const { uid: whoami } = await loginedUserStatus();
  const loginedUser = await prisma.user.findUnique({ where: { id: whoami } });
  const user = await prisma.user.findUnique({
    where: { id: parseInt(uid) },
    include: {
      commentes: {
        include: { commentator: true, votes: true },
        orderBy: { createdAt: "desc" },
      },
      ownedBooks: true,
      booklists: true,
    },
  });

  if (!user) notFound();
  return (
    <div className="flex flex-col items-stretch justify-stretch gap-6">
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

      <div className="space-y-5 border-none p-0 outline-none">
        <Accordion type="multiple" defaultValue={["item-2"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>{user.name}&apos;s Booklists</AccordionTrigger>
            <AccordionContent>
              <UserBooklists booklists={user.booklists} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{user.name}&apos;s Bookshelf</AccordionTrigger>
            <AccordionContent>
              <UserBookshelf books={user.ownedBooks} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Comments ({user.commentes.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex max-w-[800px] flex-col items-stretch justify-start">
                <Comment
                  initialValue={{ comments: user.commentes, loginedUser }}
                >
                  <CommentEditor action={setComment} uid={parseInt(uid)} />
                  <CommentFeeds />
                </Comment>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default UserPage;
