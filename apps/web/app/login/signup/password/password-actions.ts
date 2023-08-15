"use server";

import { createHash } from "node:crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { prisma } from "@/lib/database";
import { sign } from "@/lib/jsonwebtoken";

export async function register(userEmail: string, password: string) {
  const passwdHash = createHash("sha512").update(password).digest("hex");
  const emailHash = createHash("md5").update(userEmail).digest("hex");
  const tempUserName = "User_" + emailHash.slice(0, 6).toUpperCase();

  try {
    const { id } = await prisma.user.create({
      data: {
        name: tempUserName,
        email: userEmail,
        avatar: `https://www.gravatar.com/avatar/${emailHash}?d=identicon`,
        authentication: {
          create: { password: passwdHash },
        },
      },
    });

    const jwt = await sign({ uid: id.toString() }, { expiresIn: "30d" });
    const cookieStore = cookies();

    // Expiration time: 30 days
    cookieStore.set("token", jwt, { maxAge: 2592000, path: "/" });
    cookieStore.set("uid", id.toString(), { maxAge: 2592000, path: "/" });

    revalidatePath("/login/signup");

    return { uid: id } as const;
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return { error: `User with email (${userEmail}) already exist!` };
    }
    return { error: error.message };
  }
}
