import { HiOutlineEmojiSad } from "react-icons/hi";

import { prisma } from "@/lib/database";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookArtwork } from "@/components/book-artwork";

const HomePage: React.FC = () => {
  return (
    <Tabs defaultValue="for-you" className="h-full space-y-6">
      <TabsList>
        <TabsTrigger value="for-you" className="relative">
          For you
        </TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
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
  const popularBooks = await getPopularBooks(10);
  const madeForYouBooks = await getRandomBooks(10); // TODO: make this actually made for you

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Popular</h2>
          <p className="text-sm text-muted-foreground">
            Top picks for you. Updated daily.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea className="flex space-x-4 pb-4">
          <div className="flex space-x-4 pb-4">
            {popularBooks.map((book) => (
              <BookArtwork
                key={`popular-book-${book.id}`}
                book={book}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
        <p className="text-sm text-muted-foreground">
          Your personal booklists. Updated daily.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {madeForYouBooks.map((book) => (
              <BookArtwork
                key={`made-for-you-book-${book.id}`}
                book={book}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
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
          <p className="text-sm text-muted-foreground">
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
        <HiOutlineEmojiSad className="w-14 h-14" />
        <h3 className="mt-4 text-lg font-semibold">There is no content yet</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not followed anyone yet. Add one below.
        </p>
        <Button size="sm" className="relative">
          Add a friend
        </Button>
      </div>
    </div>
  );
};

const getPopularBooks = async (limit: number, offset = 0) => {
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
    skip: offset,
    take: limit,
  });
};

const getRandomBooks = async (take: number) => {
  const booksCount = await prisma.book.count();

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
    skip: Math.floor(Math.random() * booksCount),
    take: take,
  });
};

export default HomePage;
