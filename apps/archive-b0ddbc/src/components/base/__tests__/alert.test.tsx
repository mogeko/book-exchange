import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Alert from "@/components/base/alert";

describe("Alert", () => {
  it("renders an error alert correctly", () => {
    const { container } = render(<Alert.Error message="Error!" />);

    expect(container.querySelector("div")).toHaveClass("alert alert-error");
    expect(container.querySelector("div")).toHaveTextContent("Error!");
  });

  it("snapshot an error alert", () => {
    const { container } = render(<Alert.Error message="Error!" />);

    expect(container).toMatchSnapshot();
  });

  it("renders a warning alert correctly", () => {
    const { container } = render(<Alert.Warning message="Warning!" />);

    expect(container.querySelector("div")).toHaveClass("alert alert-warning");
    expect(container.querySelector("div")).toHaveTextContent("Warning!");
  });

  it("snapshot a warning alert", () => {
    const { container } = render(<Alert.Warning message="Warning!" />);

    expect(container).toMatchSnapshot();
  });

  it("renders an info alert correctly", () => {
    const { container } = render(<Alert.Info message="Info!" />);

    expect(container.querySelector("div")).toHaveClass("alert alert-info");
    expect(container.querySelector("div")).toHaveTextContent("Info!");
  });

  it("snapshot an info alert", () => {
    const { container } = render(<Alert.Info message="Info!" />);

    expect(container).toMatchSnapshot();
  });

  it("renders a success alert correctly", () => {
    const { container } = render(<Alert.Success message="Success!" />);

    expect(container.querySelector("div")).toHaveClass("alert alert-success");
    expect(container.querySelector("div")).toHaveTextContent("Success!");
  });

  it("snapshot a success alert", () => {
    const { container } = render(<Alert.Success message="Success!" />);

    expect(container).toMatchSnapshot();
  });
});
