import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@/lib/utils/testTools";
import User from "@/components/user";

describe("User", () => {
  it.skip("renders a user menu without logined", () => {
    const { container } = render(<User />);

    expect(screen.getByText("Sign in / Sign up")).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("renders a user menu with logined", async () => {
    const { container } = render(<User />);

    await waitFor(() => {
      expect(screen.getByText("Britney.Skiles")).toBeInTheDocument();
      expect(
        screen.getByRole("menu", { name: "User Menu" })
      ).toBeInTheDocument();
      expect(screen.getAllByRole("menuitem")).toHaveLength(3);
      expect(
        screen.getByRole("button", { name: "Sign out" })
      ).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
