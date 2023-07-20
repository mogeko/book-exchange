import "@testing-library/jest-dom";
import { render, screen, renderHook } from "@testing-library/react";
import { Input } from "@/components/form";
import { useForm } from "react-hook-form";

describe("Input", () => {
  it("renders an <input> with label", () => {
    const { result } = renderHook(() => useForm());
    const { container } = render(
      <Input label="Test" register={result.current.register} />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "test");

    expect(container).toMatchSnapshot();
  });

  it("renders an <input> with name", () => {
    const { result } = renderHook(() => useForm());
    const { container } = render(
      <Input name="test" register={result.current.register} />
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "test");

    expect(container).toMatchSnapshot();
  });

  it("render an <input> without register", () => {
    const { container } = render(<Input placeholder="test-input" />);

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "test-input"
    );

    expect(container).toMatchSnapshot();
  });
});
