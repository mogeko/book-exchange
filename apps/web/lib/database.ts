import { PrismaClient, type Prisma } from "@mogeko/bookworm-db";

export const prisma = new PrismaClient();

export { Prisma };
