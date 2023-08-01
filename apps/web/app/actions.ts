"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/database";
import { sign } from "@/lib/jsonwebtoken";

export async function login({ email, password }: LoginPayload, from?: string) {
  const passwdHash = createHash("sha512").update(password).digest("hex");

  const auth = await prisma.auth.findUnique({
    where: { userEmail: email },
    include: { user: true },
  });

  if (!auth) {
    return { error: "Since you're new here, please register first!" } as const;
  } else if (auth.password !== passwdHash) {
    return { error: "Wrong password! Try again." } as const;
  }

  const uid = auth.user.id.toString();
  const jwt = await sign({ uid }, { expiresIn: "7d" });
  const cookieStore = cookies();

  cookieStore.set("token", jwt, {
    expires: new Date(Date.now() + 604800000), // 7 days
    path: "/",
  });
  cookieStore.set("uid", auth.user.id.toString(), {
    expires: new Date(Date.now() + 604800000), // 7 days
    path: "/",
  });

  redirect(from ?? `/dashboard/${uid}`);
}

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete("token");
  cookieStore.delete("uid");

  redirect("/login");
}

type LoginPayload = { email: string; password: string };
