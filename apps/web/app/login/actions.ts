"use server";

import { createHash } from "node:crypto";
import { cookies } from "next/headers";

import { prisma } from "@/lib/database";
import { sign } from "@/lib/jwt";

/**
 * Since we do not use standard Form Actions on the client side, and we need to handle exceptions
 * on the client side, **`Server Mutations` cannot be used in this Action.**
 *
 * > #### Server Mutations
 * >
 * > Server Actions that mutates your data and calls `redirect`, `revalidatePath`, or `revalidateTag`.
 *
 * @see {@link https://github.com/react-hook-form/react-hook-form/issues/10391}
 */
export async function login(email: string, password: string) {
  const passwdHash = createHash("sha512").update(password).digest("hex");

  const auth = await prisma.auth.findUnique({
    where: { userEmail: email },
    include: { user: true },
  });

  if (!auth) {
    return {
      ok: false,
      error: "Since you're new here, please register first!",
    } as const;
  } else if (auth.password !== passwdHash) {
    return { ok: false, error: "Wrong password! Try again." } as const;
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

  return { ok: true, uid } as const;
}
