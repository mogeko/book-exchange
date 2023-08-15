"use server";

import { revalidatePath } from "next/cache";
import { loginedUserStatus } from "@/actions/user-status";

import { prisma } from "@/lib/database";

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
