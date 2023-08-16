"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/database";
import { loginedUserStatus } from "@/lib/user-actions";

export async function setUsername(name: string, redirectTo: string = "/") {
  const { uid: id } = await loginedUserStatus();

  try {
    await prisma.user.update({ where: { id }, data: { name } });
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }

  redirect(redirectTo);
}
