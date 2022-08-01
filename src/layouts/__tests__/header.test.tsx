import "@testing-library/jest-dom";
import { render, screen } from "@/lib/test-utils";
import Header from "@/layouts/header";

describe("Header", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", { name: /Bookworm/i })
    ).toBeInTheDocument();
  });
});
