import { faker } from "@faker-js/faker/locale/en";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
faker.seed(12345); // To make sure we get the same data every time

async function seedBooks() {
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
        },
      });
    })
  );
}

type Books = Awaited<ReturnType<typeof seedBooks>>;

async function seedUsers(books: Books) {
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
          books: {
            create: arrayElements(books, { min: 0, max: 50 }).map((book) => {
              return { bookId: book.id };
            }),
          },
        },
      });
    })
  );
}

async function seedWriter(books: Books) {
  return await Promise.all(
    randomArrayWith(50, async () => {
      const name = faker.person.fullName();
      return await prisma.writer.upsert({
        where: { name: name },
        update: {},
        create: {
          name: name,
          artworks: {
            create: arrayElements(books, { min: 1, max: 10 }).map((book) => {
              return { bookId: book.id };
            }),
          },
        },
      });
    })
  );
}

/** Helper function to generate an array of random values */
function randomArrayWith<T>(length: number, fn: () => T) {
  return Array.from({ length: faker.number.int(length) }).map(fn);
}

/** Helper function to generate an array of random values */
const arrayElements = faker.helpers.arrayElements;

// Run the seed function
(async () => {
  try {
    const books = await seedBooks();

    await seedUsers(books);
    await seedWriter(books);
  } catch (err) {
    console.error(err), process.exit(1);
  } finally {
    await prisma.$disconnect();
    faker.seed();
  }
})();
