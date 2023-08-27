"use client";

import {
  createContext,
  use,
  experimental_useOptimistic as useOptimistic,
} from "react";

import type { Comment, Score as ScoreType, User } from "@/lib/database";

const CommentContext = createContext<{
  scores: Score[];
  addScore: (score: Score) => void;
}>({ scores: [], addScore: (_) => {} });

export const CommentContextProvider: React.FC<
  React.PropsWithChildren<{ initialScores: Score[] }>
> = ({ initialScores, ...props }) => {
  const [optimistic, addOptimistic] = useOptimistic(
    initialScores,
    (scores: Score[], newScore: Score) => {
      return scores.concat(newScore);
    }
  );

  return (
    <CommentContext.Provider
      value={{ scores: optimistic, addScore: addOptimistic }}
      {...props}
    />
  );
};

export const useComment = () => use(CommentContext);

export type Score = {
  comment: {
    commentator: Pick<User, "avatar" | "name" | "id">;
  } & Pick<Comment, "content" | "createdAt" | "id">;
} & Pick<ScoreType, "rate">;
