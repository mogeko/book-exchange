import "@testing-library/jest-dom";
import { render, waitFor, screen } from "@/lib/test-utils";
import useOnScreenMock from "@/lib/hooks/__mocks__/useOnScreenMock";
import BookList from "@/components/books/bookList";

describe("bookList", () => {
  beforeEach(() => {
    useOnScreenMock.not.visiable();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a BookList", async () => {
    const { container } = render(<BookList limit={10} page={2} />);

    await waitFor(() => {
      expect(screen.getAllByRole("figure")).toHaveLength(10);
    });

    expect(container).toMatchSnapshot();
  });
});

describe("bookList with IntersectionObserver", () => {
  beforeEach(() => {
    useOnScreenMock.visiable();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a BookList when the screen touches the bottom", async () => {
    render(<BookList limit={10} page={2} />);

    await waitFor(() => {
      expect(screen.getAllByRole("figure")).toHaveLength(20);
    });
  });
});
