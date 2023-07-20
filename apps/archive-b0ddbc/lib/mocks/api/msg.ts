import type { MessageType } from "@/lib/hooks/useMessage";
import { oneOf, randomNum } from "@/lib/mocks/utils";
import { rest } from "msw";

const messageHandlers = [
  rest.get("/api/msg", (_, res, ctx) => {
    const genFakeMsg = (() => {
      const random = randomNum(2310); // 2 * 3 * 5 * 7 * 11
      const msg: MessageType = Array.from({ length: 2 }, () => ({
        id: `msg${randomNum({ min: 1000000000, max: 10000000000 })}`,
        key: oneOf(["MENUS_LIBRARY", "USER_PROFILE", "MENUS_QUOTE"]),
      }));

      return () => {
        if (random < 210 || msg.length < 5) {
          // 1/11 probability of push message
          msg.push({
            id: `msg${randomNum({ min: 1000000000, max: 10000000000 })}`,
            key: oneOf(["MENUS_LIBRARY", "USER_PROFILE", "MENUS_QUOTE"]),
          });
        }

        return msg;
      };
    })();

    return res(ctx.json<MessageType>(genFakeMsg()));
  }),
];

export default messageHandlers;
