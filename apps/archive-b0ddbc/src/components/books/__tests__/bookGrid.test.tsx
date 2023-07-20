import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@/lib/test-utils";
import BookGrid from "@/components/books/bookGrid";

describe("bookGrid", () => {
  it.skip("renders a BookGrid", async () => {
    const { container } = render(<BookGrid maxPages={2} limit={3} page={5} />);

    await waitFor(() => {
      expect(screen.getAllByRole("figure")).toHaveLength(3);
    });

    expect(container).toMatchSnapshot();
  });
});
