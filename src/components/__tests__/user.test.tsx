import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@/lib/test-utils";
import User from "@/components/user";

describe("User", () => {
  it("renders a user menu without logined", () => {
    const { container } = render(<User />);

    expect(screen.getByText("Sign in / Sign up")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("renders a user menu with logined", async () => {
    document.cookie = "auth-id=10000";

    const { container } = render(<User />);

    await waitFor(() => {
      expect(screen.getByText("Britney.Skiles")).toBeInTheDocument();
      expect(
        screen.getByRole("menu", { name: "User Menu" })
      ).toBeInTheDocument();
      expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("presentation", { name: /new messages/i })
      ).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it("logout", async () => {
    document.cookie = "auth-id=10000";

    const { container } = render(<User />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Sign out" })
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign out" }));

    await waitFor(() => {
      expect(screen.getByText("Sign in / Sign up")).toBeInTheDocument();
      expect(document.cookie).toEqual("");
    });

    expect(container).toMatchSnapshot();
  });
});
