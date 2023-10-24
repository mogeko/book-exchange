"use client";

import { useRouter } from "next/navigation";
import { LuChevronLeft } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const BackButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className={cn("h-6 w-6", className)}
      size={null}
      onClick={() => router.back()}
      {...props}
    >
      <LuChevronLeft className="h-5 w-5" />
    </Button>
  );
};
