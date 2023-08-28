"use client";

import { LuTrash2, LuX } from "react-icons/lu";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const DeleteButton: React.FC<
  React.ComponentPropsWithoutRef<typeof Button>
> = ({ onClick, className, variant = null, size = "sm", ...props }) => {
  if (props.disabled) return;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn("hover:text-destructive rounded-full", className)}
          variant={variant}
          size={size}
          {...props}
        >
          <LuX className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            comment you have made.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            <LuTrash2 className="mr-1 h-4 w-4" />
            Yes, Delete it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
