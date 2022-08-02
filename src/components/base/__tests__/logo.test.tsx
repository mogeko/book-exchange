import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logo from "@/components/base/logo";
import logoImage from "@/public/logo.svg";

describe("Logo", () => {
  it("Create a logo with image", () => {
    const { container } = render(<Logo src={logoImage}>Test Logo</Logo>);

    expect(screen.getByRole("link", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("Create a logo without image", () => {
    const { container } = render(<Logo>Test Logo</Logo>);

    expect(
      screen.queryByRole("img", { name: /logo/i })
    ).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
