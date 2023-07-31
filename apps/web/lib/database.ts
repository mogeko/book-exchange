import { PrismaClient } from "@mogeko/bookworm-db";

export const prisma = new PrismaClient();

export * from "@mogeko/bookworm-db";
