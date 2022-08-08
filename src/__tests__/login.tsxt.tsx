import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fetcher from "@/lib/fetcher";

describe("Authorize API", () => {
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

    expect(auth).toMatchSnapshot();
  });
});

interface ResType {
  id: `${number}`;
  token: string;
}
