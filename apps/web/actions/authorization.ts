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
  const jwt = await sign({ uid }, { expiresIn: "30d" });
  const cookieStore = cookies();

  // Expiration time: 30 days
  cookieStore.set("token", jwt, { maxAge: 2592000, path: "/" });
  cookieStore.set("uid", uid, { maxAge: 2592000, path: "/" });

  redirect(from ?? "/");
}

export async function register(
  { email, password, username }: RegisterPayload,
  from?: string
) {
  const passwdHash = createHash("sha512").update(password).digest("hex");
  const emailHash = createHash("md5").update(email).digest("hex");

  try {
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        avatar: `https://www.gravatar.com/avatar/${emailHash}?d=identicon`,
        authentication: {
          create: { password: passwdHash },
        },
      },
    });

    return await login({ email: user.email, password: password }, from);
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") {
      redirect(from ?? "/");
    } else {
      return { error: error.message as string };
    }
  }
}

export async function logout() {
  const cookieStore = cookies();

  cookieStore.delete("token");
  cookieStore.delete("uid");

  redirect("/login");
}

type LoginPayload = { email: string; password: string };

type RegisterPayload = { username: string } & LoginPayload;
