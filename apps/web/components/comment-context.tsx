"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  experimental_useOptimistic as useOptimistic,
  useState,
  useTransition,
} from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { LuTrash2, LuX } from "react-icons/lu";
import { TiStarFullOutline } from "react-icons/ti";

import { likeDislike, removeComment } from "@/lib/comment-actions";
import type { Score, Comment as TComment, User, Voter } from "@/lib/database";
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
import { Toggle } from "@/components/ui/toggle";
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
        comment: {
          content: data.content,
          commentator: initialValue.loginedUser,
          createdAt: new Date(),
          votes: [],
          id: NaN,
        },
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
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const { comments } = useComment();
  const user = useLoginedUser();

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
                  disabled={commentator.id !== user?.id}
                  cid={comment.id}
                />
              </header>
              <main className="flex flex-col items-stretch justify-center gap-3 p-6 pt-0">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {comment.content}
                </p>
                <LikeDislikeButton
                  votes={comment.votes}
                  defaultState={
                    comment.votes.find((v) => v.voterId === user?.id)?.vote
                  }
                  cid={comment.id}
                />
              </main>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export const DeleteButton: React.FC<
  { cid: number } & React.ComponentPropsWithoutRef<typeof Button>
> = ({ cid, className, variant = null, size = "sm", ...props }) => {
  const [_, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDeleteComment = useCallback(() => {
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
  }, [startTransition, toast, cid]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn("hover:text-destructive rounded-full", className)}
          variant={variant}
          size={size}
          {...props}
        >
          <LuX className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            comment you have made.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteComment}>
            <LuTrash2 className="mr-1 h-4 w-4" />
            Yes, Delete it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const LikeDislikeButton: React.FC<
  {
    votes: Pick<Voter, "voterId" | "vote">[];
    defaultState?: VoteState;
    cid: number;
  } & React.ComponentPropsWithoutRef<typeof Toggle>
> = ({ cid, votes, className, defaultState, ...props }) => {
  const [state, setState] = useState<VoteState>(defaultState ?? null);
  const classes = cn(
    "hover:bg-background hover:text-primary text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-primary",
    className
  );
  const [_, startTransition] = useTransition();
  const { toast } = useToast();
  const user = useLoginedUser();

  const likeCount = useMemo(
    () => votes.filter((v) => v.vote === "LIKE").length,
    [votes]
  );

  const setLikeDislike = useCallback(
    (state: VoteState) => {
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
    [startTransition, toast, cid, user]
  );

  const handleStateChange = useCallback(
    (state: VoteState) => {
      if (state === "LIKE") {
        setState("LIKE"), setLikeDislike("LIKE");
      } else if (state === "DISLIKE") {
        setState("DISLIKE"), setLikeDislike("DISLIKE");
      } else {
        setState(null), setLikeDislike(null);
      }
    },
    [setState, setLikeDislike]
  );

  return (
    <div className="flex flex-row items-center justify-start gap-6">
      <Toggle
        pressed={state === "LIKE"}
        onPressedChange={(p) => handleStateChange(p ? "LIKE" : null)}
        className={classes}
        {...props}
      >
        {state === "LIKE" ? (
          <BiSolidLike className="h-4 w-4" />
        ) : (
          <BiLike className="h-4 w-4" />
        )}
        <span className="ml-2">
          {"LIKE" + (likeCount ? ` (${likeCount})` : "")}
        </span>
      </Toggle>
      <Toggle
        pressed={state === "DISLIKE"}
        onPressedChange={(p) => handleStateChange(p ? "DISLIKE" : null)}
        className={classes}
        {...props}
      >
        {state === "DISLIKE" ? (
          <BiSolidDislike className="h-4 w-4" />
        ) : (
          <BiDislike className="h-4 w-4" />
        )}
        <span className="ml-2">Dislike</span>
      </Toggle>
    </div>
  );
};

type OptimisticData = { content: string; rate?: number };
export type VoteState = "LIKE" | "DISLIKE" | null;
export type CommentType = {
  comment: {
    commentator: Pick<User, "avatar" | "name" | "id">;
    votes: Pick<Voter, "voterId" | "vote">[];
  } & Pick<TComment, "content" | "createdAt" | "id">;
} & Partial<Pick<Score, "rate">>;
