"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";

export async function setComment(
  { bookId, userId }: { bookId: number; userId: number },
  { content, rate }: { content: string; rate: number }
) {
  try {
    await prisma.score.create({
      data: {
        book: {
          connect: { id: bookId },
        },
        comment: {
          create: {
            commentator: { connect: { id: userId } },
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
