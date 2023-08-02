export const siteSecret = {
  jwt: process.env.JWT_SECRET || "jwt-secret",
};

export type siteSecret = typeof siteSecret;
