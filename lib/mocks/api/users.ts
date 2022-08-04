import { type UserType } from "@/lib/hooks/useUsers";
import { faker } from "@faker-js/faker";
import { rest } from "msw";

const usersHandlers = [
  rest.get("/api/users/:uid", (req, res, ctx) => {
    const { uid } = req.params;

    return res(
      ctx.json<UserType>({
        id: uid as `${number}`,
        avatar: faker.image.avatar(),
        username: faker.internet.userName(),
        fullname: `${faker.name.firstName()} ${faker.name.lastName()}`,
        description: faker.lorem.paragraph(10),
        email: faker.internet.email(),
        city: faker.address.city(),
        birthdate: faker.date.birthdate().toUTCString(),
      })
    );
  }),
];

export default usersHandlers;
