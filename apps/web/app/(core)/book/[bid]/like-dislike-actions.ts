"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";

export async function likeDislike(
  state: "LIKE" | "DISLIKE" | null,
  { cid, uid }: { cid: number; uid: number }
) {
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
