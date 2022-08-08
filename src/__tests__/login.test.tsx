import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fetcher from "@/lib/fetcher";

describe("Authorize API", () => {
  it("return a hmac salt", async () => {
    const { salt } = await fetcher<Salt>("/api/auth/salt");

    expect(salt).toBeDefined();

    expect(salt).toMatchSnapshot();
  });

  it("return an authorization token", async () => {
    const auth = await fetcher<ResType>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "test",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const getCookie = (key: string) => {
      const cookies = document.cookie.split("; ");

      return cookies.find((c) => c.startsWith(key))?.split("=")[1];
    };

    expect(auth.id).toEqual(getCookie("auth-id"));
    expect(auth.token).toEqual(getCookie("auth-token"));

    expect(auth).toMatchSnapshot();
  });
});

interface ResType {
  id: `${number}`;
  token: string;
}

interface Salt {
  salt: string;
}
