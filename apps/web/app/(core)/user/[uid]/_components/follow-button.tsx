"use client";

import { useCallback, useTransition } from "react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { follow } from "@/app/(core)/user/[uid]/follow-actions";

export const FollowButton: React.FC<{ uid: number }> = ({ uid }) => {
  const [_, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFollow = useCallback(() => {
    startTransition(async () => {
      const { error } = await follow(uid);

      if (error) {
        toast({
          variant: "destructive",
          title: "Oooooops! Something went wrong.",
          description: error,
        });
      }
    });
  }, [uid, toast]);

  return (
    <Button className="rounded-full" onClick={handleFollow} size="sm">
      Follow
    </Button>
  );
};
