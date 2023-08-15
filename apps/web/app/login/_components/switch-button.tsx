"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const SwitchButton: React.FC<
  React.ComponentPropsWithoutRef<typeof Link>
> = ({ className, children, href, ...props }) => {
  const searchParams = useSearchParams();

  return (
    <Link
      href={href + "?" + searchParams.toString()}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
