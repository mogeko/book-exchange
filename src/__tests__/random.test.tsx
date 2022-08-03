import { render, screen, waitFor } from "@/lib/utils/testTools";
import RandomPage from "@/pages/random";
import mockRouter from "next-router-mock";
import "@testing-library/jest-dom";

describe("RandomPage", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/random");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render", async () => {
    render(<RandomPage />);

    expect(screen.getByText("We will jump to")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(mockRouter).toMatchObject({ asPath: "/random" });

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: "/books/bk900",
        pathname: "/books/[id]",
        query: { id: "bk900" },
      });
    });
  });
});
