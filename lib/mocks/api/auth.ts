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

    return res(
      ctx.cookie("auth-id", authID),
      ctx.cookie("auth-token", authToken),
      ctx.json<ResType>({
        id: authID as `${number}`,
        token: authToken,
      })
    );
  }),
];

interface ReqType {
  username: string;
  password: string;
  salt: string;
}

interface ResType {
  id: `${number}`;
  token: string;
}

interface Salt {
  salt: string;
}

export default authHandlers;
