import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout, { DefaultLayout } from "@/layouts/layout";

describe("Layout", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Layout>
        <div>hello, world!</div>
      </Layout>
    );

    expect(screen.getByText(/hello, world!/)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("should render correctly with Header and Footer", () => {
    const { container } = render(
      <DefaultLayout>
        <div>hello, world!</div>
      </DefaultLayout>
    );

    expect(screen.getByText(/hello, world!/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Bookworm" })
    ).toBeInTheDocument();
    expect(screen.getByText(/copyright/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
