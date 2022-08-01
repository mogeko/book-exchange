import { faker } from "@faker-js/faker";
import { rest } from "msw";

const randomHandlers = [
  rest.get("/api/random", (_, res, ctx) => {
    const bkid = `bk${faker.datatype.number(1000)}`;
    return res(
      ctx.json({
        id: bkid,
        url: `/books/${bkid}`,
      })
    );
  }),
];

export default randomHandlers;
