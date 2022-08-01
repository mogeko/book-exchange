import { type MessageType } from "@/lib/hooks/useMessage";
import { faker } from "@faker-js/faker";
import { rest } from "msw";

const messageHandlers = [
  rest.get("/api/msg", (_, res, ctx) => {
    return res(
      ctx.json<MessageType>(
        Array.from(
          { length: faker.datatype.number({ min: 3, max: 5 }) },
          () => ({
            id: `msg${faker.datatype.number({
              min: 1000000000,
              max: 10000000000,
            })}`,
            key: "MENUS_QUOTE",
          })
        )
      )
    );
  }),
];

export default messageHandlers;
