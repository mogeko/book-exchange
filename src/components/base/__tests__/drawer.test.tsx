import "@testing-library/jest-dom";
import { render, screen } from "@/lib/test-utils";
import { DrawerButton, withDrawer } from "@/components/base/drawer";

const ExampleDrawer = withDrawer((prop) => <div {...prop} />);

describe("Drawer", () => {
  it("renders a globale menu", () => {
    const { container } = render(
      <ExampleDrawer toggleId="menu-test">test</ExampleDrawer>
    );

    expect(
      screen.getByRole("menu", { name: "Drawer Menu" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    expect(screen.getAllByRole("link")).toHaveLength(3);

    expect(container).toMatchSnapshot();
  });

  it("renders a DrawerButton", () => {
    const { container } = render(<DrawerButton toggleId="menu-test" />);

    expect(
      screen.getByRole("button", { name: "Drawer Button" })
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
