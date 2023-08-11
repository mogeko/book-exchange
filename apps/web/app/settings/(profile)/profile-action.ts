"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/database";
import type { ProfileFormValues } from "@/app/settings/(profile)/profile-form";

export async function update(uid: number, data: ProfileFormValues) {
  const { location, bio, ...dataForUser } = data;

  try {
    const { id } = await prisma.user.update({
      where: { id: uid },
      data: {
        profile: {
          update: { location, bio },
        },
        ...dataForUser,
      },
    });

    revalidatePath("/settings"); // Revalidate cache

    return { data: { uid: id } } as const;
  } catch (error: any) {
    if (error.code === "P2002") {
      const key: keyof ProfileFormValues = error.meta.target;
      return {
        error: `The ${key} (${data[key]}) already exists`,
      } as const;
    } else {
      return { error: error.message } as const;
    }
  }
}
