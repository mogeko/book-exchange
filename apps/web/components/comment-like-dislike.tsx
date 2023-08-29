"use client";

import {
  useCallback,
  experimental_useOptimistic as useOptimistic,
  useState,
} from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";

export const LikeDislikeButton: React.FC<
  {
    onStateChange: React.Dispatch<VoteState>;
    votes: { vote: VoteState }[];
    defaultState?: VoteState;
  } & React.ComponentPropsWithoutRef<typeof Toggle>
> = ({ onStateChange, className, defaultState, votes, ...props }) => {
  const [state, setState] = useState<VoteState>(defaultState ?? null);

  const [likeCount, addLikeCount] = useOptimistic(
    votes.filter((v) => v.vote === "LIKE").length,
    (count, x: number) => Math.max(0, count + x)
  );

  const handleLikeChange = useCallback(
    (pressed: boolean) => {
      if (pressed) {
        setState("LIKE"), onStateChange("LIKE"), addLikeCount(1);
      } else {
        setState(null), onStateChange(null), addLikeCount(-1);
      }
    },
    [setState, onStateChange, addLikeCount]
  );

  const handleDislikeChange = useCallback(
    (pressed: boolean) => {
      if (pressed) {
        if (state === "LIKE") addLikeCount(-1);
        setState("DISLIKE"), onStateChange("DISLIKE");
      } else {
        setState(null), onStateChange(null);
      }
    },
    [setState, onStateChange, addLikeCount, state]
  );

  return (
    <div className="flex flex-row items-center justify-start gap-6">
      <Toggle
        pressed={state === "LIKE"}
        onPressedChange={handleLikeChange}
        className={cn(
          "hover:bg-background hover:text-primary text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-primary",
          className
        )}
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
        onPressedChange={handleDislikeChange}
        className={cn(
          "hover:bg-background hover:text-primary text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-primary",
          className
        )}
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

export type VoteState = "LIKE" | "DISLIKE" | null;
