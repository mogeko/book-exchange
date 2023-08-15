"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/database";
import { sign } from "@/lib/jsonwebtoken";

export async function login(
  { email, password }: { email: string; password: string },
  { to, reload }: { to: string; reload?: boolean } = { to: "/" }
) {
  const passwdHash = createHash("sha512").update(password).digest("hex");

  const auth = await prisma.auth.findUnique({
    where: { userEmail: email },
    include: {
      user: { select: { id: true } },
    },
  });

  if (!auth) {
    return { error: "Since you're new here, please register first!" } as const;
  } else if (auth.password !== passwdHash) {
    return { error: "Wrong password! Try again." } as const;
  }

  const uid = auth.user.id.toString();
  const jwt = await sign({ uid }, { expiresIn: "30d" });
  const cookieStore = cookies();

  // Expiration time: 30 days
  cookieStore.set("token", jwt, { maxAge: 2592000, path: "/" });
  cookieStore.set("uid", uid, { maxAge: 2592000, path: "/" });

  reload ? revalidatePath(to ?? "/") : redirect(to ?? "/");

  return { uid } as const;
}

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete("token");
  cookieStore.delete("uid");

  redirect("/login");
}
