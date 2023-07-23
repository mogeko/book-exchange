import { createHash } from "node:crypto";
import { faker } from "@faker-js/faker/locale/en";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
faker.seed(12345); // To make sure we get the same data every time

async function seedWriter() {
  return await Promise.all(
    randomArrayWith(50, async () => {
      const name = faker.person.fullName();
      const writer = await prisma.writer.findFirst({ where: { name } });

      if (writer) return writer;
      return await prisma.writer.create({
        data: {
          name: name,
        },
      });
    })
  );
}

type Writers = Awaited<ReturnType<typeof seedWriter>>;

async function seedUsers() {
  return await Promise.all(
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

async function seedBooks({ users, writers, publishers, series }: BooksProps) {
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
            create: arrayElements(writers, { min: 1, max: 5 }).map((writer) => {
              return { writerId: writer.id };
            }),
          },
          owners: {
            create: arrayElements(users).map((user) => ({ ownerId: user.id })),
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
  writers: Writers;
  series: Series;
};

async function seedFollows(users: Users) {
  return await Promise.all(
    randomArrayWith(500, () => arrayElements(users, 2))
      .filter(([followee, following], index, arr) => {
        if (followee.id === following.id) return false;
        return (
          arr.findIndex(
            ([x, y]) => x.id === followee.id && y.id === following.id
          ) === index
        );
      })
      .map(async ([followee, following]) => {
        return await prisma.somebody.upsert({
          where: {
            followeeId_followingId: {
              followeeId: followee.id,
              followingId: following.id,
            },
          },
          update: {},
          create: {
            followee: {
              connect: followee,
            },
            following: {
              connect: following,
            },
          },
        });
      })
  );
}

async function seedCommends(commentators: Users, targets: TargetsProps) {
  return await Promise.all(
    randomArrayWith(1000, async () => {
      const arrayElement = faker.helpers.arrayElement;
      const key = arrayElement(Object.keys(targets)) as keyof TargetsProps;
      const commentator = arrayElement(commentators);
      const target = arrayElement(targets[key] as any);
      const content = faker.lorem.paragraph({ min: 5, max: 10 });

      const commend = await prisma.comment.findFirst({ where: { content } });

      if (commend) return commend;
      return prisma.comment.create({
        data: {
          content: content,
          commentator: {
            connect: commentator,
          },
          [key === "series" ? key : key.slice(0, -1)]: {
            connect: target,
          },
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
    const writers = await seedWriter();
    const users = await seedUsers();
    const publishers = await seedPublishers();
    const series = await seedSeries();

    const books = await seedBooks({ users, writers, publishers, series });
    await seedCommends(users, { users, writers, publishers, series, books });
    await seedFollows(users);
  } catch (err) {
    console.error(err), process.exit(1);
  } finally {
    await prisma.$disconnect();
    faker.seed();
  }
})();
