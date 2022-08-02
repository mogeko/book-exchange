import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/layouts/header";

describe("Header", () => {
  it("should render correctly", () => {
    const { container } = render(<Header />);

    expect(
      screen.getByRole("heading", { name: /Bookworm/i })
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
