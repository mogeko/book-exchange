"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";

export async function setComment(
  { content, rate }: { content: string; rate: number },
  { bid, uid }: { bid: number; uid: number }
) {
  try {
    await prisma.score.create({
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

    return revalidatePath(`/book/${bid}`), {};
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}

export async function removeComment(props: { bid: number; cid: number }) {
  try {
    await prisma.score.delete({ where: { commentId: props.cid } });

    return revalidatePath(`/book/${props.bid}`), {};
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
