"use client";

import { useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

import { cn } from "@/lib/utils";

export const Description: React.FC<{
  context: string | null;
}> = ({ context }) => {
  const [showMore, setShowMore] = useState(false);

  if (!context) return;
  return (
    <div className="flex flex-col gap-2">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Description
      </h3>
      <div className="gap-0">
        <p
          className={cn(
            "text-muted-foreground leading-7",
            showMore ? "line-clamp-none" : "line-clamp-3"
          )}
        >
          {context}
        </p>
        <button
          onClick={(e) => (e.preventDefault, setShowMore((target) => !target))}
          className="text-primary inline-flex items-end rounded-md text-sm font-medium underline-offset-4 hover:underline"
        >
          {showMore ? (
            <>
              <span>Read less</span>
              <LuChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Read more</span>
              <LuChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
