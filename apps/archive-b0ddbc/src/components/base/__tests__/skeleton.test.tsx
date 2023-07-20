import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Skeleton from "@/components/base/skeleton";

describe("Skeleton", () => {
  it("snapshot a Pulse container", () => {
    const { container } = render(
      <Skeleton>
        <></>
      </Skeleton>
    );

    expect(container).toMatchSnapshot();
  });

  it("Create a Pulse Square skeleton", () => {
    const { container } = render(
      <div className="animate-pulse">
        <Skeleton.Square count={2} />
      </div>
    );

    expect(container.querySelector("div")).toHaveClass("animate-pulse");

    expect(container).toMatchSnapshot();
  });

  it("Create a Pulse Circle skeleton", () => {
    const { container } = render(
      <div className="animate-pulse">
        <Skeleton.Circle count={3} />
      </div>
    );

    expect(container.querySelector("div")).toHaveClass("animate-pulse");

    expect(container).toMatchSnapshot();
  });
});
