import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@/lib/test-utils";
import fetcher from "@/lib/fetcher";
import Login, { type Salt, type ResType } from "@/pages/login";

const getCookie = (key: string) => {
  const cookies = document.cookie.split("; ");

  return cookies.find((c) => c.startsWith(key))?.split("=")[1];
};

describe("Login", () => {
  it("should login success", async () => {
    const { container } = render(<Login />);

    expect(screen.getByRole("img", { name: "logo" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Sign in to Bookworm" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("contentinfo", { name: "Footer" })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("textbox")).not.toHaveAttribute("disabled");
      expect(screen.getByPlaceholderText(/password/i)).not.toHaveAttribute(
        "disabled"
      );
    });

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test-username" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "test-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/login Success/i)).toBeInTheDocument();
      expect(getCookie("auth-id")).toBeDefined();
      expect(getCookie("auth-token")).toBeDefined();
    });

    expect(container).toMatchSnapshot();
  });

  it("should login failed", async () => {
    const { container } = render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});

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
