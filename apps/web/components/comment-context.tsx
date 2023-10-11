"use client";

import {
  createContext,
  use,
  useCallback,
  experimental_useOptimistic as useOptimistic,
  useTransition,
} from "react";
import { format, formatDistanceToNow, isBefore, subDays } from "date-fns";
import { TiStarFullOutline } from "react-icons/ti";

import { likeDislike, removeComment } from "@/lib/comment-actions";
import type { Score, Comment as TComment, User, Voter } from "@/lib/database";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DeleteButton } from "@/components/comment-delete";
import { LikeDislikeButton } from "@/components/comment-like-dislike";
import { LineClamp3 } from "@/components/line-clamp";
import { Link } from "@/components/link";

const LoginedUserContext = createContext<User | null>(null);

const CommentContext = createContext<{
  comments: CommentType[];
  addComment: React.Dispatch<OptimisticData>;
}>({ comments: [], addComment: (_) => {} });

export const Comment: React.FC<
  React.PropsWithChildren<{
    initialValue: { comments: CommentType[]; loginedUser: User | null };
  }>
> = ({ initialValue, ...props }) => {
  const [comments, addComment] = useOptimistic(
    initialValue.comments,
    (comments: CommentType[], data: OptimisticData) => {
      if (!initialValue.loginedUser) return comments;

      const newComment: CommentType = {
        content: data.content,
        commentator: initialValue.loginedUser,
        createdAt: new Date(),
        votes: [],
        id: NaN,
        rate: data.rate,
      };

      return [newComment].concat(comments);
    }
  );

  return (
    <LoginedUserContext.Provider value={initialValue.loginedUser}>
      <CommentContext.Provider value={{ comments, addComment }} {...props} />
    </LoginedUserContext.Provider>
  );
};

export const useLoginedUser = () => use(LoginedUserContext);
export const useComment = () => use(CommentContext);

export const CommentFeeds: React.FC<
  {
    actions?: {
      removeComment: (cid: number) => Promise<any>;
      likeDislike: (state: VoteState, cid: number) => Promise<any>;
    };
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, actions = { likeDislike, removeComment }, ...props }) => {
  const [_, startTransition] = useTransition();
  const { toast } = useToast();
  const { comments } = useComment();
  const user = useLoginedUser();

  const handleDeleteComment = useCallback(
    (cid: number) => {
      startTransition(async () => {
        const { error } = await actions.removeComment(cid);

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

        const { error } = await actions.likeDislike(state, cid);

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
      {comments.map(({ commentator, rate, ...comment }, i) => {
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
                      {rate && (
                        <Badge variant="outline">
                          <TiStarFullOutline className="mr-1 h-4 w-4 text-[#FFAC2D]" />
                          {rate}
                        </Badge>
                      )}
                      <p className="text-muted-foreground text-sm">
                        {isBefore(comment.createdAt, subDays(new Date(), 7))
                          ? format(comment.createdAt, "PPP")
                          : formatDistanceToNow(comment.createdAt, {
                              addSuffix: true,
                            })}
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
                <LineClamp3 className="[&:not(:first-child)]:mt-6">
                  {comment.content}
                </LineClamp3>
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

type OptimisticData = { content: string; rate?: number };
export type VoteState = "LIKE" | "DISLIKE" | null;
export type CommentType = {
  commentator: Pick<User, "avatar" | "name" | "id">;
  votes: Pick<Voter, "voterId" | "vote">[];
} & Pick<TComment, "content" | "createdAt" | "id"> &
  Partial<Pick<Score, "rate">>;
