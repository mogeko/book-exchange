import { randomNum } from "@/lib/utils/mockTools";
import { rest } from "msw";

const randomHandlers = [
  rest.get("/api/random", (_, res, ctx) => {
    const bkid = `bk${randomNum(1000)}`;

    return res(
      ctx.json({
        id: bkid,
        url: `/books/${bkid}`,
      })
    );
  }),
];

export default randomHandlers;
