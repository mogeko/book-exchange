"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const MenuButton: React.FC<
  {
    variant?: "secondary" | "ghost";
  } & React.ComponentProps<typeof Link>
> = ({ className, variant, href, ...props }) => {
  const pathname = usePathname();
  const _variant =
    variant ?? (pathname.startsWith(href.toString()) ? "secondary" : "ghost");

  return (
    <Link
      className={cn(
        buttonVariants({ variant: _variant }),
        "w-full justify-start truncate"
      )}
      href={href}
      {...props}
    />
  );
};
