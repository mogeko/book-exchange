"use client";

import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

import { cn } from "@/lib/utils";

export const LineClamp3: React.FC<
  {} & React.HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = useState(false);
  const [isClamped, setClamped] = useState(false);

  useEffect(() => {
    if (contentRef && contentRef.current) {
      setClamped(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-0">
      <div
        ref={contentRef}
        className={cn(
          "leading-7",
          !showMore ? "line-clamp-3" : "line-clamp-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
      {isClamped && (
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
      )}
    </div>
  );
};
