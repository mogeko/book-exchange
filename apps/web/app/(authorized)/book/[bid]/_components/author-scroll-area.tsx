import Image from "next/image";
import Link from "next/link";

import type { Author as AuthorType } from "@/lib/database";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const AuthorScrollArea: React.FC<{
  authors: Array<React.ComponentPropsWithoutRef<typeof Author>["author"]>;
}> = ({ authors }) => {
  return (
    <section className="space-y-5 border-none p-0 outline-none">
      <h2 className="text-2xl font-semibold tracking-tight">
        Author and translator
      </h2>
      <div className="relative">
        <ScrollArea className="flex space-x-4 pb-4">
          <div className="flex space-x-4 pb-4">
            {authors.map((author) => (
              <Author key={`author-${author.id}`} author={author} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

const Author: React.FC<{
  author: AuthorType & { type: string };
}> = ({ author: { id, name, avatar, type } }) => {
  return (
    <Card className="space-y-3 overflow-hidden">
      <Link href={`/author/${id}`}>
        <div className="w-[150px]">
          <AspectRatio ratio={1}>
            <Image
              src={avatar ?? ""}
              className="object-cover"
              alt="author-avatar"
              fill
            />
          </AspectRatio>
        </div>
      </Link>
      <div className="space-y-1 p-3 pt-0 text-sm">
        <h3 className="font-medium leading-none">{name}</h3>
        <p className="text-muted-foreground truncate text-xs capitalize">
          {type}
        </p>
      </div>
    </Card>
  );
};
