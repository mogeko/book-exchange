import { PrismaClient } from "@mogeko/bookworm-db";

const prisma = new PrismaClient();

export async function madeForYou(date: Date = new Date()) {
  const books = await prisma.book.findMany({
    select: { id: true },
  });

  const users = await prisma.user.findMany({
    where: {
      referrals: {
        none: { createdAt: { gte: new Date(date.getTime() - 43200000) } },
      },
    },
    select: { id: true },
  });

  return Promise.all(
    users.map(async (user) => {
      return await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          referrals: {
            create: {
              books: { connect: randomArray(books, 10) },
            },
          },
        },
      });
    })
  );
}

function randomArray<T>(array: T[], take: number) {
  return Array.from({ length: take }, () => {
    return array[Math.floor(Math.random() * array.length)];
  });
}

(async () => {
  const options = { year: "numeric", month: "long", day: "numeric" } as const;
  const today = new Date();
  const todayStr = today.toLocaleDateString([], options);

  try {
    const users = await madeForYou(today);

    if (users.length) {
      console.log(`[${todayStr}] 🎯 ${users.length} records have been updated`);
    } else {
      console.log(`[${todayStr}] 🎯 Nothing to do today`);
    }
  } catch (error: any) {
    console.error(error);
  }
})();
