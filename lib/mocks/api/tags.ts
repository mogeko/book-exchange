import { type TagsType } from "@/lib/hooks/useTags";
import { arrayBy, randomNum } from "@/lib/utils/mockTools";
import { faker } from "@faker-js/faker";
import { rest } from "msw";

const tagsHandlers = [
  rest.get("/api/tags", (_, res, ctx) => {
    const tags = arrayBy(
      randomNum({ min: 3, max: 5 }),
      faker.random.word()
    ).reduce((acc: Record<string, string[]>, key) => {
      acc[key] = arrayBy(randomNum({ min: 2, max: 10 }), faker.random.word());

      return acc;
    }, {});

    return res(ctx.json<TagsType>(tags));
  }),
];

export default tagsHandlers;
