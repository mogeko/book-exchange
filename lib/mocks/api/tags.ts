import { type TagsType } from "@/lib/hooks/useTags";
import { faker } from "@faker-js/faker";
import { rest } from "msw";

const tagsHandlers = [
  rest.get("/api/tags", (_, res, ctx) => {
    return res(
      ctx.json<TagsType>(
        Array.from({ length: faker.datatype.number({ min: 3, max: 5 }) }, () =>
          faker.random.word()
        ).reduce((target: Record<string, string[]>, key) => {
          target[key] = Array.from(
            { length: faker.datatype.number({ min: 2, max: 10 }) },
            () => faker.random.word()
          );
          return target;
        }, {})
      )
    );
  }),
];

export default tagsHandlers;
