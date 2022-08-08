import "@testing-library/jest-dom";
import { render, screen } from "@/lib/test-utils";
import fetcher from "@/lib/fetcher";
import Login, { type Salt, type ResType } from "@/pages/login";

const getCookie = (key: string) => {
  const cookies = document.cookie.split("; ");

  return cookies.find((c) => c.startsWith(key))?.split("=")[1];
};

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
        username: "test-username",
        password: "test-password",
        salt: "test-salt",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(auth.id).toEqual(getCookie("auth-id"));
    expect(auth.token).toEqual(getCookie("auth-token"));

    expect(auth).toMatchSnapshot();
  });
});
