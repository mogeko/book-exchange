"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";

export async function setComment(
  { content, rate }: { content: string; rate: number },
  { bid, uid }: { bid: number; uid: number }
) {
  try {
    const { bookId } = await prisma.score.create({
      data: {
        book: {
          connect: { id: bid },
        },
        comment: {
          create: {
            commentator: { connect: { id: uid } },
            content: content,
          },
        },
        rate: rate,
      },
    });

    return revalidatePath(`/book/${bookId}`), {};
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function removeComment(cid: number) {
  try {
    const { bookId } = await prisma.score.delete({ where: { commentId: cid } });

    return revalidatePath(`/book/${bookId}`), {};
  } catch (error: any) {
    return { error: error.message };
  }
}
