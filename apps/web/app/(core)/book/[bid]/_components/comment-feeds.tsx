"use client";

import { useCallback, useTransition } from "react";
import { LuTrash2, LuX } from "react-icons/lu";
import { TiStarFullOutline } from "react-icons/ti";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/components/link";
import { useComment } from "@/app/(core)/book/[bid]/_components/comment-context";
import { removeComment } from "@/app/(core)/book/[bid]/comment-actions";

export const CommentFeeds: React.FC<
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const [_, startTransition] = useTransition();
  const { toast } = useToast();
  const { comments, user, bid } = useComment();

  const handleDeleteComment = useCallback(
    (cid: number) => {
      startTransition(async () => {
        const { error } = await removeComment({ bid, cid });

        if (error) {
          toast({
            variant: "destructive",
            title: "Oooooops! Something went wrong.",
            description: error,
          });
        }
      });
    },
    [removeComment, startTransition, toast, bid]
  );

  return (
    <div
      className={cn("flex flex-col items-stretch justify-center", className)}
      {...props}
    >
      {comments.map(({ comment: { commentator, ...comment }, rate }, i) => {
        return (
          <div key={`book-comment-${i}-${comment.id || ""}`}>
            <Separator />
            <section className="group">
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
                {user?.id === commentator.id && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="hover:text-destructive hidden rounded-full group-hover:inline-flex"
                        variant={null}
                        size="sm"
                      >
                        <LuX className="h-3 w-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the comment you have made.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(_) => handleDeleteComment(comment.id)}
                        >
                          <LuTrash2 className="mr-1 h-4 w-4" />
                          Yes, Delete it
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
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
