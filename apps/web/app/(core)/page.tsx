import { LuFrown, LuPlusCircle } from "react-icons/lu";

import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookScrollArea, ViewAll } from "@/components/book-scroll-area";
import { getReferral } from "@/app/(core)/(bookshelf)/made4u/made4u-actions";

const ReadNowPage: React.FC = async () => {
  return (
    <Tabs defaultValue="for-you" className="h-full space-y-6">
      <div className="space-between flex items-center">
        <TabsList>
          <TabsTrigger value="for-you" className="relative">
            For you
          </TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
        <div className="ml-auto mr-4">
          <Button>
            <LuPlusCircle className="mr-2 h-4 w-4" />
            Add book
          </Button>
        </div>
      </div>
      <TabsContent className="border-none p-0 outline-none" value="for-you">
        <ForYou />
      </TabsContent>
      <TabsContent
        className="h-full flex-col border-none p-0 data-[state=active]:flex"
        value="following"
      >
        <Following />
      </TabsContent>
    </Tabs>
  );
};

const ForYou: React.FC = async () => {
  const { uid } = await loginedUserStatus();
  const { books: madeForYouBooks } = await getReferral(
    { uid, date: new Date() },
    { take: 10 }
  );
  const popularBooks = await getPopularBooks();

  return (
    <>
      <BookScrollArea
        title="Popular"
        description="Top picks for you. Updated daily."
        books={popularBooks}
      />
      <BookScrollArea
        title="Made for You"
        description="Your personal booklists. Updated daily."
        books={madeForYouBooks}
        aspectRatio="square"
        className="w-[150px]"
        width={150}
      >
        <ViewAll href={`/made4u`} />
      </BookScrollArea>
    </>
  );
};

const Following: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Your Following
          </h2>
          <p className="text-muted-foreground text-sm">
            Your following&apos;s top picks.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <FollowingContent />
    </>
  );
};

const FollowingContent: React.FC = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <LuFrown className="h-14 w-14" />
        <h3 className="mt-4 text-lg font-semibold">There is no content yet</h3>
        <p className="text-muted-foreground mb-4 mt-2 text-sm">
          You have not followed anyone yet. Add one below.
        </p>
        <Button size="sm" className="relative">
          Add a friend
        </Button>
      </div>
    </div>
  );
};

const getPopularBooks = async (options?: { skip: number; take: number }) => {
  "use server";

  return await prisma.book.findMany({
    orderBy: {
      owners: {
        _count: "desc",
      },
    },
    select: {
      id: true,
      title: true,
      cover: true,
      authors: {
        select: { name: true },
      },
    },
    take: options?.take ?? 10,
    skip: options?.skip ?? 0,
  });
};

export default ReadNowPage;
