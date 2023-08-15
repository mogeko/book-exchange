"use server";

import { prisma } from "@/lib/database";

export async function search(query: string) {
  return await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query } },
        { authors: { some: { name: { contains: query } } } },
        { isbn: { contains: query } },
      ],
    },
    select: { id: true, title: true },
    orderBy: {
      owners: { _count: "desc" },
    },
    take: 10,
    skip: 0,
  });
}
