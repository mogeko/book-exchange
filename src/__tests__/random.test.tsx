import { render, screen, waitFor } from "@/lib/test-utils";
import useRouterMock from "@/lib/hooks/__mocks__/useRouter";
import RandomPage from "@/pages/random";
import "@testing-library/jest-dom";

describe("RandomPage", () => {
  beforeEach(() => {
    useRouterMock.returnResult({});
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render", async () => {
    const { container } = render(<RandomPage />);

    expect(useRouterMock.target).toBeCalledWith();
    expect(screen.getByText("We will jump to")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("/books/bk900")).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
