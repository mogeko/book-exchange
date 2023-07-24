import { createHash } from "node:crypto";
import { faker } from "@faker-js/faker/locale/en";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
faker.seed(12345); // To make sure we get the same data every time

async function seedAuthor() {
  return await Promise.all(
    randomArrayWith(50, async () => {
      const name = faker.person.fullName();
      const author = await prisma.author.findFirst({ where: { name } });

      if (author) return author;
      return await prisma.author.create({
        data: {
          name: name,
        },
      });
    })
  );
}

type Authors = Awaited<ReturnType<typeof seedAuthor>>;

async function seedUsers() {
  const orginUsers = await Promise.all(
    randomArrayWith(50, async () => {
      const email = faker.internet.email();
      return await prisma.user.upsert({
        where: { email: email },
        update: {},
        create: {
          email: email,
          name: faker.internet.userName(),
          avatar: faker.image.avatar(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          authentication: {
            create: {
              password: hash("sha512", faker.internet.password()),
            },
          },
        },
      });
    })
  );

  const userWithFollows = await Promise.all(
    orginUsers.map(async (user) => {
      return await prisma.user.update({
        where: { id: user.id },
        data: {
          followedBy: {
            connect: arrayElements(orginUsers, { min: 0, max: 20 }).filter(
              (otherUser) => otherUser.id !== user.id
            ),
          },
        },
      });
    })
  );

  return await Promise.all(
    userWithFollows.map(async (user) => {
      return await prisma.user.update({
        where: { id: user.id },
        data: {
          following: {
            connect: arrayElements(orginUsers, { min: 0, max: 20 }).filter(
              (otherUser) => otherUser.id !== user.id
            ),
          },
        },
      });
    })
  );
}

type Users = Awaited<ReturnType<typeof seedUsers>>;

async function seedPublishers() {
  return await Promise.all(
    randomArrayWith(50, async () => {
      const name = faker.company.name();
      const publisher = await prisma.publisher.findFirst({ where: { name } });

      if (publisher) return publisher;
      return await prisma.publisher.create({
        data: {
          name: name,
        },
      });
    })
  );
}

type Publishers = Awaited<ReturnType<typeof seedPublishers>>;

async function seedSeries() {
  return await Promise.all(
    randomArrayWith(50, async () => {
      const name = faker.lorem.sentence(5);
      return await prisma.series.upsert({
        where: { name: name },
        update: {},
        create: {
          name: name,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          discription: faker.lorem.paragraph({ min: 5, max: 10 }),
          cover: faker.image.urlLoremFlickr({ width: 1280, height: 1114 }),
        },
      });
    })
  );
}

type Series = Awaited<ReturnType<typeof seedSeries>>;

async function seedBooks({ users, authors, publishers, series }: BooksProps) {
  return await Promise.all(
    randomArrayWith(100, async () => {
      const isbn = faker.phone.number("978-#-##-######-#");
      return await prisma.book.upsert({
        where: { isbn: isbn },
        update: {},
        create: {
          title: faker.lorem.sentence(5),
          discription: faker.lorem.paragraph({ min: 5, max: 10 }),
          cover: faker.image.urlLoremFlickr({ width: 1280, height: 1114 }),
          isbn: isbn,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
          authors: {
            connect: arrayElements(authors, { min: 1, max: 5 }),
          },
          owners: {
            connect: arrayElements(users),
          },
          publisher: {
            connect: faker.helpers.arrayElement(publishers),
          },
          series: {
            connect: faker.helpers.arrayElement(series),
          },
        },
      });
    })
  );
}

type BooksProps = {
  users: Users;
  publishers: Publishers;
  authors: Authors;
  series: Series;
};

async function seedCommends(commentators: Users, targets: TargetsProps) {
  return await Promise.all(
    randomArrayWith(1000, async () => {
      const content = faker.lorem.paragraph({ min: 5, max: 10 });
      const commentator = faker.helpers.arrayElement(commentators);

      const handleTargets = (targets: TargetsProps): any => {
        const key = faker.helpers.arrayElement(
          Object.keys(targets)
        ) as keyof TargetsProps;
        const target = faker.helpers.arrayElement(targets[key] as any);

        if (key === "books") {
          return {
            score: {
              create: {
                rate: faker.number.int({ min: 0, max: 10 }),
                book: { connect: target },
              },
            },
          };
        } else if (key === "series") {
          return {
            series: { connect: target },
          };
        } else {
          return {
            [key.slice(0, -1)]: { connect: target },
          };
        }
      };

      const commend = await prisma.comment.findFirst({ where: { content } });

      if (commend) return commend;
      return prisma.comment.create({
        data: {
          content: content,
          commentator: {
            connect: commentator,
          },
          votes: {
            create: arrayElements(commentators, { min: 0, max: 20 }).map(
              (commentator) => {
                return {
                  voter: { connect: commentator },
                  vote: faker.datatype.boolean(0.6),
                };
              }
            ),
          },
          ...handleTargets(targets),
        },
      });
    })
  );
}

type TargetsProps = {
  books: Awaited<ReturnType<typeof seedBooks>>;
} & BooksProps;

/** Helper function to generate an array of random values */
function randomArrayWith<T>(length: number, fn: () => T) {
  return Array.from({ length: faker.number.int(length) }).map(fn);
}

/** Helper function to generate a hash value */
function hash(algorithm: string, value: string) {
  return createHash(algorithm).update(value).digest("hex");
}

/** Helper function to generate an array of random values */
const arrayElements = faker.helpers.arrayElements;

// Run the seed function
(async () => {
  try {
    const results = {
      authors: await seedAuthor(),
      users: await seedUsers(),
      publishers: await seedPublishers(),
      series: await seedSeries(),
    };

    const books = await seedBooks(results);
    await seedCommends(results.users, { ...results, books });
  } catch (err) {
    console.error(err), process.exit(1);
  } finally {
    await prisma.$disconnect();
    faker.seed();
  }
})();
