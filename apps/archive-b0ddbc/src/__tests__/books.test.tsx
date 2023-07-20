import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@/lib/test-utils";
import mockRouter from "next-router-mock";
import BookPage, { BookView } from "@/pages/books/[id]";

describe("Books Page", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/books/bk1000");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a Books Page", () => {
    const { container } = render(<BookPage />);

    expect(container).toMatchSnapshot();
  });
});

describe("BookView", () => {
  it("render a BookView", async () => {
    const { container } = render(<BookView id="bk1000" />);

    await waitFor(() => {
      expect(screen.getAllByRole("heading")).toHaveLength(3);
      expect(
        screen.getByRole("heading", { name: "About this book" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Popular Highlights in this book" })
      ).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
