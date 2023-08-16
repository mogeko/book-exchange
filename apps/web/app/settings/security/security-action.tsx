"use server";

import { createHash } from "node:crypto";

import { prisma } from "@/lib/database";
import { login } from "@/app/login/(signin)/signin-actions";
import type { SecurityFormValues } from "@/app/settings/security/security-form";

export async function update(uid: number, data: SecurityFormValues) {
  const { currentPassword: oldPassword, newPassword } = data;
  const oldPasswdHash = createHash("sha512").update(oldPassword).digest("hex");
  const newPasswdHash = createHash("sha512").update(newPassword).digest("hex");

  try {
    const { email } = await prisma.user.update({
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

    return await login(
      { email, password: newPassword },
      { redirect: "/setting/security", reload: true }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return { error: "Your current password is incorrect." } as const;
    } else {
      return { error: error.message as string } as const;
    }
  }
}
