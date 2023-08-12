"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/database";
import { sign } from "@/lib/jsonwebtoken";
import type { SecurityFormValues } from "@/app/settings/security/security-form";

export async function update(uid: number, data: SecurityFormValues) {
  const { currentPassword: oldPassword, newPassword } = data;
  const oldPasswdHash = createHash("sha512").update(oldPassword).digest("hex");
  const newPasswdHash = createHash("sha512").update(newPassword).digest("hex");

  try {
    const { id } = await prisma.user.update({
      where: {
        authentication: {
          password: { equals: oldPasswdHash },
        },
        id: uid,
      },
      data: {
        authentication: {
          update: {
            password: newPasswdHash,
          },
        },
      },
    });

    const jwt = await sign({ uid: id.toString() }, { expiresIn: "30d" });
    const cookieStore = cookies();

    // Expiration time: 30 days
    cookieStore.set("token", jwt, { maxAge: 2592000, path: "/" });
    cookieStore.set("uid", id.toString(), { maxAge: 2592000, path: "/" });

    revalidatePath("/settings/security");

    return { uid: id } as const;
  } catch (error: any) {
    if (error.code === "P2025") {
      return { error: "Your current password is incorrect." } as const;
    } else {
      return { error: error.message as string } as const;
    }
  }
}
