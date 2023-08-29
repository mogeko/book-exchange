"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";
import type { VoteState } from "@/components/comment-context";

export async function removeComment(cid: number) {
  try {
    const { bookId } = await prisma.score.delete({ where: { commentId: cid } });

    return revalidatePath(`/book/${bookId}`), {};
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function likeDislike(state: VoteState, cid: number, uid: number) {
  try {
    if (state) {
      const {
        comment: { score },
      } = await prisma.voter.update({
        where: { voterId_commentId: { commentId: cid, voterId: uid } },
        data: { vote: state },
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
    return { error: error.message };
  }
}
