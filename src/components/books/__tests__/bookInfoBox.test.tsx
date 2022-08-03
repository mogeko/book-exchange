import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@/lib/utils/testTools";
import BookInfo from "@/components/books/bookInfoBox";

const exampleCover = "https://via.placeholder.com/150";

describe("BookInfo", () => {
  it("renders a BookInfo without meta data", async () => {
    const { container } = render(
      <BookInfo title="title" cover={exampleCover} />
    );

    await waitFor(() => {
      expect(
        screen.getByRole("figure", { name: "Cover Image" })
      ).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
