import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/layouts/footer";

describe("Footer", () => {
  it("create a footer with author", () => {
    const now = new Date().getFullYear();
    const { container } = render(<Footer time={now} author="Zheng Junyi" />);

    expect(
      screen.getByRole("presentation", { name: "copyright" })
    ).toHaveTextContent(
      `Copyright © ${now}, All right reserved by Zheng Junyi.`
    );

    expect(container).toMatchSnapshot();
  });

  it("create a footer without author", () => {
    const { container } = render(<Footer time={1997} />);

    expect(screen.getByText(/1997 -/)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
