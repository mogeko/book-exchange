import type { LoginFormInput, Salt, ResType } from "@/pages/login";
import { randomNum } from "@/lib/mocks/utils";
import { faker } from "@faker-js/faker";
import { rest } from "msw";

const authHandlers = [
  rest.get("/api/auth/salt", (_, res, ctx) => {
    return res(
      ctx.json<Salt>({
        salt: faker.random.alphaNumeric(16),
      })
    );
  }),
  rest.post("/api/auth/login", async (req, res, ctx) => {
    const { username, password, salt } = await req.json<ReqType>();
    const authID = `${randomNum({ min: 1000, max: 100000 })}`;
    const authToken = faker.datatype.uuid();

    if (username && password && salt) {
      return res(
        ctx.cookie("auth-id", authID),
        ctx.cookie("auth-token", authToken),
        ctx.json<ResType>({
          id: authID as `${number}`,
          token: authToken,
        })
      );
    }

    return res(
      ctx.status(403),
      ctx.json({ message: "Failed to authenticate!" })
    );
  }),
];

type ReqType = {
  salt: string;
} & LoginFormInput;

export default authHandlers;
