import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@/lib/test-utils";
import useRouterMock from "@/__mocks__/useRouter";
import useOnScreenMock from "@/__mocks__/useOnScreenMock";
import Tags from "@/pages/tags/[tag]";

describe("Tags", () => {
  beforeEach(() => {
    useRouterMock.returnResult({ query: { tag: "test" } });
    useOnScreenMock.not.visiable();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a Tags", async () => {
    render(<Tags />);

    expect(useRouterMock.target).toBeCalledWith();

    expect(
      screen.getByRole("heading", { name: /Tag: test/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("list", { name: /books list/i })
      ).toBeInTheDocument();
      expect(screen.getAllByRole("listitem")).toHaveLength(10);
    });
  });
});
