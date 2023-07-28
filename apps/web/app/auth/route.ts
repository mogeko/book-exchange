import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

import { secret } from "@/config/secret";
import { prisma } from "@/lib/database";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.auth.findUnique({ where: { userEmail: email } });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } else if (user.password !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const jwtToken = sign({ email }, secret.jwt, { expiresIn: "7d" });
  const response = NextResponse.json({ data: { user } }, { status: 200 });
  response.cookies.set("jwt", jwtToken, {
    expires: new Date(Date.now() + 604800000), // 7 days
    path: "/",
  });

  return response;
}
