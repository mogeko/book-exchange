import "@testing-library/jest-dom";
import { render, screen } from "@/lib/test-utils";
import { DrawerButton, withDrawer } from "@/components/base/drawer";

const ExampleDrawer = withDrawer((prop) => <div {...prop} />);

describe("Drawer", () => {
  it("renders a globale menu", () => {
    const { container } = render(
      <ExampleDrawer toggleId="menu-test">test</ExampleDrawer>
    );

    expect(screen.getByText("My library")).toBeInTheDocument();
    expect(container.querySelector(".drawer-content div")?.textContent).toEqual(
      "test"
    );
  });

  it("snapshot a globale menu", () => {
    const { container } = render(
      <ExampleDrawer toggleId="menu-test">test</ExampleDrawer>
    );

    expect(container).toMatchSnapshot();
    expect(container.querySelector(".drawer-toggle")).toMatchSnapshot();
    expect(container.querySelector(".drawer-content")).toMatchSnapshot();
    expect(container.querySelector(".drawer-side")).toMatchSnapshot();
  });

  it("snapshot a DrawerButton", () => {
    const { container } = render(<DrawerButton toggleId="menu-test" />);

    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
