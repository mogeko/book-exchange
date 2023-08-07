"use server";

import { prisma } from "@/lib/database";

export async function getReferral({ uid, date }: Payload, options?: Options) {
  const theDayAfterDate = new Date(date.getTime() + 86400000);

  const referral = await prisma.referral.findFirst({
    where: {
      createdAt: {
        gte: new Date(date.toDateString()),
        lte: new Date(theDayAfterDate.toDateString()),
      },
      userId: uid,
    },
    include: {
      books: {
        select: { id: true, cover: true, title: true, authors: true },
        take: options?.take ?? 20,
        skip: options?.skip ?? 0,
      },
      user: {
        select: { createdAt: true },
      },
    },
  });

  return referral ?? { books: [], user: { createdAt: new Date() } };
}

export type Payload = { uid: number; date: Date };
export type Options = { take?: number; skip?: number };
