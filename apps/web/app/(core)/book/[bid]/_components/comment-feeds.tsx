"use client";

import { useCallback, useTransition } from "react";
import { TiStarFullOutline } from "react-icons/ti";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useComment, useLoginedUser } from "@/components/comment-context";
import { DeleteButton } from "@/components/comment-delete";
import {
  LikeDislikeButton,
  type VoteState,
} from "@/components/comment-like-dislike";
import { Link } from "@/components/link";
import { removeComment } from "@/app/(core)/book/[bid]/comment-actions";
import { likeDislike } from "@/app/(core)/book/[bid]/like-dislike-actions";

export const CommentFeeds: React.FC<
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const [_, startTransition] = useTransition();
  const { toast } = useToast();
  const { comments } = useComment();
  const user = useLoginedUser();

  const handleDeleteComment = useCallback(
    (cid: number) => {
      startTransition(async () => {
        const { error } = await removeComment(cid);

        if (error) {
          toast({
            variant: "destructive",
            title: "Oooooops! Something went wrong.",
            description: error,
          });
        }
      });
    },
    [startTransition, toast]
  );

  const handleLikeDislike = useCallback(
    (state: VoteState, cid: number) => {
      startTransition(async () => {
        if (!user) return;

        const { error } = await likeDislike(state, user.id, cid);

        if (error) {
          toast({
            variant: "destructive",
            title: "Oooooops! Something went wrong.",
            description: error,
          });
        }
      });
    },
    [startTransition, toast, user]
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
                <DeleteButton
                  className="hidden group-hover:inline-flex"
                  onClick={(_) => handleDeleteComment(comment.id)}
                  disabled={commentator.id !== user?.id}
                />
              </header>
              <main className="flex flex-col items-stretch justify-center gap-3 p-6 pt-0">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {comment.content}
                </p>
                <LikeDislikeButton
                  onStateChange={(s) => handleLikeDislike(s, comment.id)}
                  defaultState={
                    comment.votes.find((v) => v.voterId === user?.id)?.vote
                  }
                  votes={comment.votes}
                />
              </main>
            </section>
          </div>
        );
      })}
    </div>
  );
};
