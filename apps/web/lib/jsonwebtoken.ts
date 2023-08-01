import { jwtVerify, SignJWT, type JWTPayload } from "jose";

import { secret } from "@/config/secret";

export async function sign(payland: JWTPayload, { expiresIn, alg }: Opts = {}) {
  return await new SignJWT(payland)
    .setProtectedHeader({ alg: alg ?? "HS256" })
    .setExpirationTime(expiresIn ?? "7d")
    .sign(new TextEncoder().encode(secret.jwt));
}

export async function verify(token: string, { alg }: Pick<Opts, "alg"> = {}) {
  const key = new TextEncoder().encode(secret.jwt);
  const { payload } = await jwtVerify(token, key, {
    algorithms: [alg ?? "HS256"],
  });

  return payload;
}

type Opts = {
  expiresIn?: string | number;
  alg?: string;
};
