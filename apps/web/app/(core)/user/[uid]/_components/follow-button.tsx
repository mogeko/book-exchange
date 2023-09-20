"use client";

import { useCallback } from "react";

import { Button } from "@/components/ui/button";

export const FollowButton: React.FC<{ uid: number }> = ({ uid }) => {
  const handleFollow = useCallback(() => {
    console.log("follow user: " + uid);
  }, [uid]);

  return (
    <Button className="rounded-full" onClick={handleFollow} size="sm">
      Follow
    </Button>
  );
};
