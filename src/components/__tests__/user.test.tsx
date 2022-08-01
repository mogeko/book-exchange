import "@testing-library/jest-dom";
import { rest } from "msw";
import { render, screen } from "@/lib/utils/testUtils";
import { server } from "@/lib/mocks/server";
import User from "@/components/user";

describe("User", () => {
  it.skip("renders a user menu without logined", () => {
    const { container } = render(<User />);

    expect(container.querySelector("a")?.textContent).toEqual(
      "Sign in / Sign up"
    );
  });

  it.skip("snapshot a user menu without logined", () => {
    const { container } = render(<User />);

    expect(container).toMatchSnapshot();
  });

  it.skip("renders a user menu with logined", () => {
    render(<User />);

    expect(screen.getByText("Robert2")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("snapshot a user menu with logined", () => {
    const { container } = render(<User />);

    expect(container).toMatchSnapshot();
  });
});

describe.skip("User with abnormal state", () => {
  it("renders user menu when error occurred", () => {
    server.use(
      rest.get("/api/users/:uid", (_, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );

    render(<User />);

    expect(screen.getByText(/Login Error/)).toBeInTheDocument();
  });

  it("snapshot user menu when error occurred", () => {
    const { container } = render(<User />);

    expect(container).toMatchSnapshot();
  });

  it.skip("renders user menu is loading", () => {
    server.use(
      rest.get("/api/users/:uid", (_, res, ctx) => {
        return res.once(ctx.delay(10000));
      })
    );

    const { container } = render(<User />);

    expect(container.querySelector("svg")).toHaveClass("animate-spin");
  }, 5000);

  it.skip("snapshot user menu is loading", () => {
    const { container } = render(<User />);

    expect(container).toMatchSnapshot();
  });
});
