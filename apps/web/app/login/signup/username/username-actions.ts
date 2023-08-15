"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";

export async function setUsername(name: string) {
  const { uid: id } = await loginedUserStatus();

  try {
    await prisma.user.update({ where: { id }, data: { name } });

    revalidatePath("/login/username");

    return {} as const;
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
