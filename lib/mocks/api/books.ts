import { type BookType, type BooksType } from "@/lib/hooks/useBooks";
import { languages, oneOf, randomNum } from "@/lib/mocks/utils";
import { faker } from "@faker-js/faker";
import { rest } from "msw";

const descArray = () => faker.lorem.paragraph(50).split(". ");
const digestArray = () => faker.lorem.paragraph(50).split(". ");

const booksHandlers = [
  rest.get("/api/books", (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");

    return res(
      ctx.json<BooksType>(
        Array.from({ length: Number(limit ?? 10) }, () => ({
          id: `bk${randomNum(10000)}`,
          title: faker.word.noun(20),
          cover: faker.image.image(1280, 1910),
          tags: Array.from({ length: randomNum({ min: 2, max: 8 }) }, () =>
            faker.lorem.words(2)
          ),
          rates: randomNum(100),
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
        tags: Array.from({ length: randomNum({ min: 2, max: 8 }) }, () =>
          faker.lorem.words(2)
        ),
        rates: randomNum(100),
        mate: {
          author: faker.name.firstName(),
          publisher: faker.company.companyName(),
          subtitle: faker.lorem.sentence(10),
          language: languages(oneOf),
          publication_date: "2002-04-24T22:56:21.478Z",
          isbn: `978-${randomNum({ min: 1000000000, max: 1999999999 })}`,
          [oneOf(["paperback", "hardcover"])]: randomNum({
            min: 100,
            max: 1000,
          }),
        },
        desc: {
          text: `${descArray().slice(0, 10).join(". ")}.`,
          is_folded: faker.datatype.boolean(),
        },
        digest: {
          text: `${digestArray().slice(0, 10).join(". ")}.`,
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
        text: descArray().join(". "),
      })
    );
  }),
  rest.get("/api/books/:bkid/digest", (req, res, ctx) => {
    const { bkid } = req.params;

    return res(
      ctx.json({
        id: bkid as `bk${number}`,
        text: digestArray().join(". "),
      })
    );
  }),
];

export default booksHandlers;
