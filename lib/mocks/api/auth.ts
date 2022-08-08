import { randomNum } from "@/lib/mocks/utils";
import { faker } from "@faker-js/faker";
import { rest } from "msw";

const authHandlers = [
  rest.post("/api/auth/login", async (req, res, ctx) => {
    const { username, password } = await req.json<ReqType>();

    return res(
      ctx.json<ResType>({
        id: `${randomNum({ min: 1000, max: 100000 })}`,
        token: faker.datatype.uuid(),
      })
    );
  }),
];

interface ReqType {
  username: string;
  password: string;
}

interface ResType {
  id: `${number}`;
  token: string;
}

export default authHandlers;
