import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Box from "@/layouts/boxes";

describe("Home", () => {
  it("renders a Display Box with Header", () => {
    const { container } = render(
      <Box title="Example Title">
        <></>
      </Box>
    );

    expect(screen.getByRole("heading")).toHaveTextContent("Example Title");

    expect(container).toMatchSnapshot();
  });

  it("renders a SubBox", () => {
    const { container } = render(
      <Box.SubBox title="Example SubBox">
        <></>
      </Box.SubBox>
    );
    expect(screen.getByRole("heading")).toHaveTextContent("Example SubBox");

    expect(container).toMatchSnapshot();
  });
});
