"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/database";

export async function follow(uid: number) {
  try {
    const whoami = parseInt(cookies().get("uid")?.value ?? redirect("/login"));

    if (whoami === uid) {
      throw new Error("You can't follow yourself");
    }

    const { id } = await prisma.user.update({
      where: { id: uid },
      data: { followedBy: { connect: { id: whoami } } },
      select: { id: true },
    });

    return revalidatePath(`/user/${id}`), {};
  } catch (error: any) {
    return { error: error.message };
  }
}
