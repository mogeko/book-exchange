"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";
import type { AccountFormValues } from "@/app/settings/account/account-form";

export async function update(uid: number, data: AccountFormValues) {
  const { birthday } = data;

  try {
    const { userId } = await prisma.profile.update({
      where: { userId: uid },
      data: {
        birthday,
      },
    });

    revalidatePath("/settings/account"); // Revalidate cache

    return { data: { uid: userId } } as const;
  } catch (error: any) {
    return { error: error.message } as const;
  }
}
