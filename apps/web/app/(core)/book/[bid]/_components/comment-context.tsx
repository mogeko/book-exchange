"use client";

import {
  createContext,
  use,
  experimental_useOptimistic as useOptimistic,
} from "react";

import type { Comment, Score as ScoreType, User } from "@/lib/database";

const CommentContext = createContext<{
  comments: Score[];
  addComment: (score: Score) => void;
}>({ comments: [], addComment: (_) => {} });

export const CommentContextProvider: React.FC<
  React.PropsWithChildren<{ initialScores: Score[] }>
> = ({ initialScores, ...props }) => {
  const [optimistic, addOptimistic] = useOptimistic(
    initialScores,
    (scores: Score[], newScore: Score) => {
      return [newScore].concat(scores);
    }
  );

  return (
    <CommentContext.Provider
      value={{ comments: optimistic, addComment: addOptimistic }}
      {...props}
    />
  );
};

export const useComment = () => use(CommentContext);

export type Score = {
  comment: {
    commentator: Pick<User, "avatar" | "name" | "id">;
    id?: number;
  } & Pick<Comment, "content" | "createdAt">;
} & Pick<ScoreType, "rate">;
