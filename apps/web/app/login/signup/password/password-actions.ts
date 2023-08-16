"use server";

import { createHash } from "node:crypto";

import { prisma } from "@/lib/database";
import { login } from "@/app/login/(signin)/signin-actions";

export async function register(
  payload: Parameters<typeof login>[0],
  searchParams: URLSearchParams | string = ""
) {
  const { email: userEmail, password } = payload;
  const passwdHash = createHash("sha512").update(password).digest("hex");
  const emailHash = createHash("md5").update(userEmail).digest("hex");
  const tempUserName = "User_" + emailHash.slice(0, 6).toUpperCase();

  try {
    await prisma.user.create({
      data: {
        name: tempUserName,
        email: userEmail,
        avatar: `https://www.gravatar.com/avatar/${emailHash}?d=identicon`,
        authentication: {
          create: { password: passwdHash },
        },
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: `User with email (${userEmail}) already exist!` };
    }
    return { error: error.message };
  }

  return await login(payload, {
    redirect: "/login/signup/username?" + searchParams?.toString(),
  });
}
