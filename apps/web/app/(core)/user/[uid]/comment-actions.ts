"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";

export async function setComment(content: string, meid: number, uid: number) {
  try {
    const { userId } = await prisma.comment.create({
      data: {
        commentator: { connect: { id: meid } },
        user: { connect: { id: uid } },
        content,
      },
      select: { userId: true },
    });

    return revalidatePath(`/user/${userId}`), {};
  } catch (error: any) {
    return { error: error.message };
  }
}
