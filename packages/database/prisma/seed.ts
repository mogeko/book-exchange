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
      const name = faker.company.name();
      const series = await prisma.series.findFirst({ where: { name } });

      if (series) return series;
      return await prisma.series.create({
        data: {
          name: name,
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

/** Helper function to generate an array of random values */
function randomArrayWith<T>(length: number, fn: () => T) {
  return Array.from({ length: faker.number.int(length) }).map(fn);
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

    await seedBooks({ users, writers, publishers, series });
  } catch (err) {
    console.error(err), process.exit(1);
  } finally {
    await prisma.$disconnect();
    faker.seed();
  }
})();
