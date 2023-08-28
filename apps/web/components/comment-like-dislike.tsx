"use client";

import { useCallback, useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";

export const LikeDislikeButton: React.FC<
  {
    onStateChange: React.Dispatch<VoteState>;
    likeCount?: number;
    defaultState?: VoteState;
  } & React.ComponentPropsWithoutRef<typeof Toggle>
> = ({ onStateChange, className, defaultState, likeCount, ...props }) => {
  const [state, setState] = useState<VoteState>(defaultState ?? null);
  const classes = cn(
    "hover:bg-background hover:text-primary text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-primary",
    className
  );

  const setStateChange = useCallback(
    (state: VoteState) => {
      if (state === "LIKE") {
        setState("LIKE"), onStateChange("LIKE");
      } else if (state === "DISLIKE") {
        setState("DISLIKE"), onStateChange("DISLIKE");
      } else {
        setState(null), onStateChange(null);
      }
    },
    [setState, onStateChange]
  );

  return (
    <div className="flex flex-row items-center justify-start gap-6">
      <Toggle
        pressed={state === "LIKE"}
        onPressedChange={(p) => setStateChange(p ? "LIKE" : null)}
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
        onPressedChange={(p) => setStateChange(p ? "DISLIKE" : null)}
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

export type VoteState = "LIKE" | "DISLIKE" | null;
