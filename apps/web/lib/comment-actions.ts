"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma, type Comment } from "@/lib/database";
import type { VoteState } from "@/components/comment-context";

export async function removeComment(cid: number) {
  try {
    const comment = await prisma.comment.delete({ where: { id: cid } });

    return revalidatePathHelper(comment);
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function likeDislike(state: VoteState, cid: number) {
  try {
    const uid = parseInt(cookies().get("uid")?.value ?? redirect("/login"));

    if (state) {
      const { comment } = await prisma.voter.upsert({
        where: { voterId_commentId: { commentId: cid, voterId: uid } },
        update: { vote: state },
        create: {
          voter: { connect: { id: uid } },
          comment: { connect: { id: cid } },
          vote: state,
        },
        include: { comment: true },
      });

      return revalidatePathHelper(comment);
    } else {
      const { comment } = await prisma.voter.delete({
        where: { voterId_commentId: { commentId: cid, voterId: uid } },
        include: { comment: true },
      });

      return revalidatePathHelper(comment);
    }
  } catch (error: any) {
    return { error: error.message };
  }
}

const revalidatePathHelper = (comment: Comment) => {
  if (comment.authorId) {
    revalidatePath(`/auther/${comment.authorId}`);
  } else if (comment.publisherId) {
    revalidatePath(`/publisher/${comment.publisherId}`);
  } else if (comment.seriesId) {
    revalidatePath(`/series/${comment.seriesId}`);
  } else if (comment.userId) {
    revalidatePath(`/user/${comment.userId}`);
  }

  return {};
};
