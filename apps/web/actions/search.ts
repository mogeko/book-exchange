"use server";

import { prisma } from "@/lib/database";

export async function search(query: string) {
  return await prisma.book.findMany({
    where: { title: { contains: query } },
    select: { id: true, title: true },
  });
}
