import { prisma } from "@/lib/database";

export const scoreFilter = {
  comment: {
    select: {
      id: true,
      commentator: {
        select: { id: true, avatar: true, name: true },
      },
      createdAt: true,
      content: true,
    },
  },
  rate: true,
} as const;

export async function getComments(bookId: number) {
  return await prisma.score.findMany({
    where: { bookId: bookId },
    select: scoreFilter,
  });
}
