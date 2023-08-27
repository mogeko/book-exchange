"use client";

import { TiStarFullOutline } from "react-icons/ti";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/link";
import { useComment } from "@/app/(core)/book/[bid]/_components/comment-context";

export const CommentFeeds: React.FC<
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const { scores } = useComment();

  return (
    <div
      className={cn("flex flex-col items-stretch justify-center", className)}
      {...props}
    >
      {scores.map(({ comment: { commentator, ...comment }, rate }, i) => {
        return (
          <div key={`book-comment-${i}-${comment.id}`}>
            <Separator />
            <section>
              <header className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Avatar>
                    <AvatarImage src={commentator.avatar} />
                    <AvatarFallback>{commentator.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-stretch gap-1">
                    <Link href={`/user/${commentator.id}`}>
                      {commentator.name}
                    </Link>
                    <div className="inline-flex flex-row items-center justify-between gap-2">
                      <Badge variant="outline">
                        <TiStarFullOutline className="mr-1 h-4 w-4 text-[#FFAC2D]" />
                        {rate}
                      </Badge>
                      <p className="text-muted-foreground text-sm">
                        {new Intl.DateTimeFormat().format(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </header>
              <main className="p-6 pt-0">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {comment.content}
                </p>
              </main>
            </section>
          </div>
        );
      })}
    </div>
  );
};
