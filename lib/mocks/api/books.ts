import { type BookType, type BooksType } from "@/lib/hooks/useBooks";
import {
  arrayBy,
  randomLanguage,
  oneOf,
  randomNum,
} from "@/lib/utils/mockTools";
import { faker } from "@faker-js/faker";
import { rest } from "msw";
import dayjs from "dayjs";

const booksHandlers = [
  rest.get("/api/books", (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");

    return res(
      ctx.json<BooksType>(
        arrayBy(Number(limit ?? 10), {
          id: `bk${randomNum(10000)}`,
          title: faker.word.noun(20),
          cover: faker.image.image(1280, 1910),
          tags: arrayBy(randomNum({ min: 2, max: 8 }), faker.lorem.words(2)),
          rates: randomNum(100),
          mate: {
            author: faker.name.firstName(),
          },
          desc: {
            text: faker.lorem.paragraph(10),
          },
        })
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
        tags: arrayBy(randomNum({ min: 2, max: 8 }), faker.lorem.words(2)),
        rates: randomNum(100),
        mate: {
          author: faker.name.firstName(),
          publisher: faker.company.companyName(),
          subtitle: faker.lorem.sentence(10),
          language: randomLanguage(),
          publication_date: dayjs(faker.date.past()).format("YYYY-MM-DD"),
          isbn: `978-${randomNum({ min: 1000000000, max: 1999999999 })}`,
          [oneOf(["paperback", "hardcover"])]: randomNum({
            min: 100,
            max: 1000,
          }),
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
