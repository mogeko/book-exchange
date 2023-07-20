import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "@/components/search";

describe("Search", () => {
  it("Create a search bar", () => {
    const { container } = render(<Search />);

    expect(screen.getByRole("search", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
