import { render, screen } from "@/lib/test-utils";
import useRouterMock from "@/__mocks__/useRouter";
import { server } from "@/lib/mocks/server";
import RandomPage from "@/pages/random";
import "@testing-library/jest-dom";
import { rest } from "msw";

describe("RandomPage", () => {
  beforeEach(() => {
    useRouterMock.returnResult({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render", async () => {
    render(<RandomPage />);

    expect(useRouterMock.target).toBeCalledWith();
    expect(screen.getByText("We will jump to")).toBeInTheDocument();
    expect(await screen.findByText("/books/bk900")).toBeInTheDocument();
  });

  it("snapshot a RandomPage", () => {
    const { container } = render(<RandomPage />);

    expect(container).toMatchSnapshot();
  });
});

describe.skip("RandomPage with abnormal state", () => {
  beforeEach(() => {
    useRouterMock.returnResult({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("render a RandomPage with error", () => {
    server.use(
      rest.get("/api/random", (_, res, ctx) => {
        return res(ctx.status(404), ctx.json({}));
      })
    );
    render(<RandomPage />);

    expect(screen.getByText("Oooops! Jumping failed!")).toBeInTheDocument();
  });

  it("snapshot a RandomPage with error", () => {
    const { container } = render(<RandomPage />);

    expect(container).toMatchSnapshot();
  });

  it("render a RandomPage when loading", () => {
    const { container } = render(<RandomPage />);

    expect(screen.getByText("We will jump to")).toBeInTheDocument();
    expect(container.querySelector("div span")?.textContent).toBe("...");
  });

  it("snapshot a RandomPage when loading", () => {
    const { container } = render(<RandomPage />);

    expect(container).toMatchSnapshot();
  });
});
