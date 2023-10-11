"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/database";

export async function setComment(
  { content, rate }: { content: string; rate: number },
  bid: number
) {
  try {
    const uid = parseInt(cookies().get("uid")?.value ?? redirect("/login"));

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
