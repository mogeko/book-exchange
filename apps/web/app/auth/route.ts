import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

import { secret } from "@/config/secret";
import { prisma } from "@/lib/database";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const passwdHash = createHash("sha512").update(password).digest("hex");

  const auth = await prisma.auth.findUnique({
    where: { userEmail: email },
    include: { user: true },
  });

  if (!auth) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } else if (auth.password !== passwdHash) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const jwtToken = sign({ email }, secret.jwt, { expiresIn: "7d" });
  const response = NextResponse.json({ data: { user: auth.user } });
  response.cookies.set("uid", auth.user.id.toString(), {
    expires: new Date(Date.now() + 604800000), // 7 days
    path: "/",
  });
  response.cookies.set("jwt", jwtToken, {
    expires: new Date(Date.now() + 604800000), // 7 days
    path: "/",
  });

  return response;
}
