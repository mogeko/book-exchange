import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useBooksInfiniteMock from "@/__mocks__/useBooksInfiniteMock";
import useOnScreenMock from "@/__mocks__/useOnScreenMock";
import BookList from "@/components/books/bookList";

describe("bookList", () => {
  beforeEach(() => {
    useBooksInfiniteMock.returnResult(4).success();
    useOnScreenMock.not.visiable();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a BookList", () => {
    const { container } = render(<BookList limit={10} page={2} />);
    const mockTarget = useBooksInfiniteMock.target;

    expect(mockTarget).toBeCalledWith({ limit: 10, page: 2 });
    expect(container.querySelectorAll("figure").length).toBe(40);
  });

  it("snapshot a BookList", () => {
    useBooksInfiniteMock.returnResult().success();
    const { container } = render(<BookList />);

    expect(container).toMatchSnapshot();
  });
});

describe("bookList with IntersectionObserver", () => {
  beforeEach(() => {
    useBooksInfiniteMock.returnResult().success();
    useOnScreenMock.visiable();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a BookList when the screen touches the bottom", () => {
    render(<BookList limit={10} page={20} />);

    expect(useBooksInfiniteMock.setSizeMock).toBeCalledTimes(1);
    expect(useBooksInfiniteMock.setSizeMock).toBeCalledWith(2);
  });
});

describe("BookList with abnormal state", () => {
  beforeEach(() => {
    useOnScreenMock.not.visiable();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a BookList then error", () => {
    useBooksInfiniteMock.returnResult().error();
    render(<BookList limit={10} page={2} />);

    expect(screen.getByText("Network Error!")).toBeInTheDocument();
  });

  it("snapshot a BookList then error", () => {
    useBooksInfiniteMock.returnResult().error();
    const { container } = render(<BookList limit={10} page={2} />);

    expect(container).toMatchSnapshot();
  });

  it("renders a Display BookList then loading", () => {
    useBooksInfiniteMock.returnResult().loading();
    const { container } = render(<BookList limit={10} page={2} />);

    expect(container.querySelector("div.animate-pulse")).toBeInTheDocument();
  });

  it("snapshot a BookList then loading", () => {
    useBooksInfiniteMock.returnResult().loading();
    const { container } = render(<BookList limit={10} page={2} />);

    expect(container).toMatchSnapshot();
  });
});
