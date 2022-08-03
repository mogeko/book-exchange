import { type BookType, type BooksType } from "@/lib/hooks/useBooks";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { rest } from "msw";

const booksHandlers = [
  rest.get("/api/books", (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");

    return res(
      ctx.json<BooksType>(
        Array.from({ length: Number(limit ?? 10) }, () => ({
          id: `bk${faker.datatype.number(100)}`,
          title: faker.word.noun(20),
          cover: faker.image.image(1280, 1910),
          tags: Array.from(
            { length: faker.datatype.number({ min: 2, max: 8 }) },
            () => faker.lorem.words(2)
          ),
          rates: faker.datatype.number(100),
          mate: {
            author: faker.name.firstName(),
          },
          desc: {
            text: faker.lorem.paragraph(10),
          },
        }))
      )
    );
  }),
  rest.get("/api/books/:bkid", (req, res, ctx) => {
    const { bkid } = req.params;

    return res(
      ctx.json<BookType>({
        id: bkid as `bk${number}`,
        title: faker.word.noun(20),
        cover: faker.image.image(1280, 1910),
        tags: Array.from(
          { length: faker.datatype.number({ min: 2, max: 8 }) },
          () => faker.lorem.words(2)
        ),
        rates: faker.datatype.number(100),
        mate: {
          author: faker.name.firstName(),
          publisher: faker.company.companyName(),
          subtitle: faker.lorem.sentence(10),
          language: "English",
          publication_date: dayjs(faker.date.past()).format("YYYY-MM-DD"),
          isbn: `978-${faker.datatype.number({
            min: 1000000000,
            max: 1999999999,
          })}`,
          paperback: faker.datatype.number({ min: 100, max: 1000 }),
        },
        desc: {
          text: faker.lorem.paragraph(10),
          is_folded: faker.datatype.boolean(),
        },
        digest: {
          text: faker.lorem.paragraph(10),
          is_folded: faker.datatype.boolean(),
        },
      })
    );
  }),
  rest.get("/api/books/:bkid/desc", (req, res, ctx) => {
    const { bkid } = req.params;

    return res(
      ctx.json({
        id: bkid as `bk${number}`,
        text: faker.lorem.paragraph(50),
      })
    );
  }),
  rest.get("/api/books/:bkid/digest", (req, res, ctx) => {
    const { bkid } = req.params;

    return res(
      ctx.json({
        id: bkid as `bk${number}`,
        text: faker.lorem.paragraph(50),
      })
    );
  }),
];

export default booksHandlers;
