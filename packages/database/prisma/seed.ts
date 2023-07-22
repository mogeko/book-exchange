import { faker } from "@faker-js/faker/locale/en";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** To generate random data for our database */
async function seedYourDatabase() {
  faker.seed(1234); // To make sure we get the same data every time

  const users = randomArrayWith(50, async () => {
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
          create: randomArrayWith(100, () => ({
            title: faker.lorem.sentence(5),
            author: faker.person.fullName(),
            discription: faker.lorem.paragraph({ min: 5, max: 10 }),
            cover: faker.image.urlLoremFlickr({ width: 1280, height: 1114 }),
            isbn: faker.phone.number("978-#-##-######-#"),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
          })),
        },
      },
    });
  });

  return await Promise.all(users);
}

/** Helper function to generate an array of random values */
function randomArrayWith<T>(length: number, fn: () => T) {
  return Array.from({ length: faker.number.int(length) }).map(fn);
}

// Run the seed function
(async () => {
  try {
    await seedYourDatabase();
  } catch (err) {
    console.error(err), process.exit(1);
  } finally {
    await prisma.$disconnect();
    faker.seed();
  }
})();
