"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";
import type { VoteState } from "@/components/comment-like-dislike";

export async function likeDislike(state: VoteState, uid: number, cid: number) {
  try {
    if (state) {
      const {
        comment: { score },
      } = await prisma.voter.upsert({
        where: { voterId_commentId: { commentId: cid, voterId: uid } },
        update: { vote: state },
        create: {
          voter: { connect: { id: uid } },
          comment: { connect: { id: cid } },
          vote: state,
        },
        include: {
          comment: { select: { score: { select: { bookId: true } } } },
        },
      });

      return revalidatePath(`/book/${score?.bookId ?? ""}`), {};
    } else {
      const {
        comment: { score },
      } = await prisma.voter.delete({
        where: { voterId_commentId: { commentId: cid, voterId: uid } },
        include: {
          comment: { select: { score: { select: { bookId: true } } } },
        },
      });

      return revalidatePath(`/book/${score?.bookId ?? ""}`), {};
    }
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
