import "@testing-library/jest-dom";
import { render, screen } from "@/lib/test-utils";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a home page", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Bookworm" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Recently Popular" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Unpopular but Highly Rated" })
    ).toBeInTheDocument();
  });
});
