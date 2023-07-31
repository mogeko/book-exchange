export const secret = {
  jwt: process.env.JWT_SECRET || "jwt-secret",
};

export type Secret = typeof secret;
