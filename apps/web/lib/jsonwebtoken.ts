import { jwtVerify, SignJWT, type JWTPayload } from "jose";

import { siteSecret } from "@/config/secret";

export async function sign(payland: JWTPayload, { expiresIn, alg }: Opts = {}) {
  return await new SignJWT(payland)
    .setProtectedHeader({ alg: alg ?? "HS256" })
    .setExpirationTime(expiresIn ?? "7d")
    .sign(new TextEncoder().encode(siteSecret.jwt));
}

export async function verify(token: string, { alg }: Pick<Opts, "alg"> = {}) {
  const secret = new TextEncoder().encode(siteSecret.jwt);
  const { payload } = await jwtVerify(token, secret, {
    algorithms: [alg ?? "HS256"],
  });

  return payload;
}

type Opts = {
  expiresIn?: string | number;
  alg?: string;
};
