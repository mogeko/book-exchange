import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RandomPage from "@/pages/random";
import useRouterMock from "@/__mocks__/useRouter";
import useQueryMock from "@/__mocks__/useQueryMock";

describe("RandomPage", () => {
  beforeEach(() => {
    useQueryMock.returnResult({ data: { book_id: "bk1", url: "/books/bk1" } });
    useRouterMock.returnResult({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render", () => {
    render(<RandomPage />);

    expect(screen.getByText("We will jump to")).toBeInTheDocument();
    expect(screen.getByText("/books/bk1")).toBeInTheDocument();
    expect(useQueryMock.target).toBeCalledWith("/api/random", {});
    expect(useRouterMock.target).toBeCalledWith();
  });

  it("snapshot a RandomPage", () => {
    const { container } = render(<RandomPage />);

    expect(container).toMatchSnapshot();
  });
});

describe("RandomPage with abnormal state", () => {
  beforeEach(() => {
    useRouterMock.returnResult({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render a RandomPage with error", () => {
    useQueryMock.returnResult({ isError: true });
    render(<RandomPage />);

    expect(screen.getByText("Oooops! Jumping failed!")).toBeInTheDocument();
  });

  it("snapshot a RandomPage with error", () => {
    useQueryMock.returnResult({ isError: true });
    const { container } = render(<RandomPage />);

    expect(container).toMatchSnapshot();
  });

  it("render a RandomPage when loading", () => {
    useQueryMock.returnResult({ isLoading: true });
    const { container } = render(<RandomPage />);

    expect(screen.getByText("We will jump to")).toBeInTheDocument();
    expect(container.querySelector("div span")?.textContent).toBe("...");
  });

  it("snapshot a RandomPage when loading", () => {
    useQueryMock.returnResult({ isLoading: true });
    const { container } = render(<RandomPage />);

    expect(container).toMatchSnapshot();
  });
});
