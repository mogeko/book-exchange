import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useBooksMock from "@/__mocks__/useBooksMock";
import BookGrid from "@/components/books/bookGrid";

describe("bookGrid", () => {
  beforeEach(() => {
    useBooksMock.returnResult().success();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a BookGrid", () => {
    const { container } = render(<BookGrid maxPages={2} limit={3} page={5} />);

    expect(useBooksMock.target).toBeCalledWith({ limit: 3, page: 5 });
    expect(useBooksMock.target).toBeCalledTimes(2);
    expect(container.querySelectorAll("figure").length).toBe(3);
  });

  it("snapshot a BookGrid", () => {
    const { container } = render(<BookGrid limit={10} />);

    expect(container).toMatchSnapshot();
  });
});

describe("bookGrid with abnormal state", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a BookGrid then error", () => {
    useBooksMock.returnResult().error();
    render(<BookGrid limit={10} page={1} />);

    expect(useBooksMock.target).toBeCalledWith({ limit: 10, page: 1 });
    expect(screen.getByText("Network Error!")).toBeInTheDocument();
  });

  it("snapshot a BooksGrid then error", () => {
    useBooksMock.returnResult().error();
    const { container } = render(<BookGrid limit={10} page={1} />);

    expect(container).toMatchSnapshot();
  });

  it("renders a Display BookGrid then loading", () => {
    useBooksMock.returnResult().loading();
    const { container } = render(<BookGrid limit={10} page={1} />);

    expect(useBooksMock.target).toBeCalledWith({ limit: 10, page: 1 });
    expect(container.querySelector("div.animate-pulse")).toBeInTheDocument();
  });

  it("snapshot a BookGrid then loading", () => {
    useBooksMock.returnResult().loading();
    const { container } = render(<BookGrid limit={10} page={1} />);

    expect(container).toMatchSnapshot();
  });
});
