import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@/lib/test-utils";
import useOnScreenMock from "@/lib/hooks/__mocks__/useOnScreenMock";
import mockRouter from "next-router-mock";
import Tags from "@/pages/tags/[tag]";

describe("Tags", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/tags/test");
    useOnScreenMock.not.visiable();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders a Tags", async () => {
    render(<Tags />);

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
