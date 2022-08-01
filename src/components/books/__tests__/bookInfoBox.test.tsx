import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { exampleData } from "@/__mocks__/useBookMock";
import BookInfo from "@/components/books/bookInfoBox";

describe("BookInfo", () => {
  it("renders a BookInfo without meta data", () => {
    const { container } = render(
      <BookInfo title="title" cover={exampleData.cover} />
    );

    expect(container.querySelector("h1")?.textContent).toBeUndefined();
  });

  it("snapshot a BookInfo", () => {
    const { container } = render(
      <BookInfo title="title" cover={exampleData.cover} />
    );

    expect(container).toMatchSnapshot();
  });
});
