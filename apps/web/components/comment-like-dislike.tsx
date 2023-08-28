"use client";

import { useCallback, useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";

export const LikeDislikeButton: React.FC<
  {
    onStateChange: React.Dispatch<VoteState>;
    defaultState?: VoteState;
    likeCount?: number;
  } & React.ComponentPropsWithoutRef<typeof Toggle>
> = ({ onStateChange, className, defaultPressed, likeCount, ...props }) => {
  const [state, setState] = useState<VoteState>(
    defaultPressed === true
      ? "like"
      : defaultPressed === false
      ? "dislike"
      : null
  );
  const classes = cn(
    "hover:bg-background hover:text-primary text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-primary",
    className
  );

  const setStateChange = useCallback((state: VoteState) => {
    if (state === "like") {
      setState("like"), onStateChange("like");
    } else if (state === "dislike") {
      setState("dislike"), onStateChange("dislike");
    } else {
      setState(null), onStateChange(null);
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-start gap-6">
      <Toggle
        pressed={state === "like"}
        onPressedChange={(p) => setStateChange(p ? "like" : null)}
        className={classes}
        {...props}
      >
        {state === "like" ? (
          <BiSolidLike className="h-4 w-4" />
        ) : (
          <BiLike className="h-4 w-4" />
        )}
        <span className="ml-2">
          {"Like" + (likeCount ? ` (${likeCount})` : "")}
        </span>
      </Toggle>
      <Toggle
        pressed={state === "dislike"}
        onPressedChange={(p) => setStateChange(p ? "dislike" : null)}
        className={classes}
        {...props}
      >
        {state === "dislike" ? (
          <BiSolidDislike className="h-4 w-4" />
        ) : (
          <BiDislike className="h-4 w-4" />
        )}
        <span className="ml-2">Dislike</span>
      </Toggle>
    </div>
  );
};

export type VoteState = "like" | "dislike" | null;
