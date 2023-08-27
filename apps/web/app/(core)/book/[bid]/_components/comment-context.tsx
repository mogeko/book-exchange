"use client";

import {
  createContext,
  use,
  experimental_useOptimistic as useOptimistic,
} from "react";

import type { Comment, Score as ScoreType, User } from "@/lib/database";

const CommentContext = createContext<{
  comments: Score[];
  addOptimistic: React.Dispatch<OptimisticData>;
  bid: number;
  user: User | null;
}>({ comments: [], addOptimistic: (_) => {}, user: null, bid: NaN });

export const CommentContextProvider: React.FC<
  React.PropsWithChildren<{
    initialValue: { scores: Score[]; user: User | null };
  }>
> = ({ initialValue: { user, scores: initialScores }, ...props }) => {
  const bid = initialScores[0].bookId;
  const [optimistic, addOptimistic] = useOptimistic(
    initialScores,
    (scores: Score[], data: OptimisticData) => {
      if (!user) return scores;

      const newScore: Score = {
        comment: {
          commentator: user,
          content: data.content,
          createdAt: new Date(),
          id: NaN,
        },
        rate: data.rate,
        bookId: bid,
      };

      return [newScore].concat(scores);
    }
  );

  return (
    <CommentContext.Provider
      value={{ comments: optimistic, addOptimistic, user, bid }}
      {...props}
    />
  );
};

export const useComment = () => use(CommentContext);

type OptimisticData = { content: string; rate: number };
export type Score = {
  comment: {
    commentator: Pick<User, "avatar" | "name" | "id">;
  } & Pick<Comment, "content" | "createdAt" | "id">;
} & Pick<ScoreType, "rate" | "bookId">;
