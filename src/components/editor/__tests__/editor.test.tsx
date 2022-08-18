import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Editor from "@/components/editor/editor";

describe("Editor", () => {
  it("render an Editor", () => {
    const { container } = render(
      <Editor onSubmit={(data) => expect(data.content).toBeDefined()} />
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox").querySelector("p")).toHaveAttribute(
      "data-placeholder"
    );
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByText(/0 characters/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(container).toMatchSnapshot();
  });
});
