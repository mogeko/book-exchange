import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@/lib/test-utils";
import TagsCotroller from "@/layouts/tagsCotroller";

describe("TagsCotroller", () => {
  it("should render correctly", async () => {
    const { container } = render(<TagsCotroller />);

    expect(screen.getByRole("heading", { name: /tags/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole("heading").length).toBeGreaterThanOrEqual(4);
      expect(
        screen.getAllByRole("link", { name: /tag/i }).length
      ).toBeGreaterThanOrEqual(3);
    });

    expect(container).toMatchSnapshot();
  });
});
