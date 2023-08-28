import "server-only";

import { PrismaClient } from "@mogeko/bookworm-db";

declare global {
  var prisma: PrismaClient;
}

// Make sure that PrismaClient is instantiated only once.
// See: https://github.com/prisma/prisma/issues/1983#issuecomment-620621213
export const prisma = (() => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }

    return global.prisma;
  }
})();

export * from "@mogeko/bookworm-db";
