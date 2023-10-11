"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/database";

export async function setComment(content: string, uid: number) {
  try {
    const whoami = parseInt(cookies().get("uid")?.value ?? redirect("/login"));

    const { userId } = await prisma.comment.create({
      data: {
        commentator: { connect: { id: whoami } },
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
