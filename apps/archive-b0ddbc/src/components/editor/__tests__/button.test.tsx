import "@testing-library/jest-dom";
import { render, renderHook, screen, fireEvent } from "@testing-library/react";
import { PresetButtons } from "@/components/editor/buttons";
import extensions from "@/components/editor/extensions";
import { useEditor } from "@tiptap/react";

const {
  bubble: [Bold, Italic, RedMark, YellowMark, GreenMark, BlueMark, Strike],
  floating: [H1, H2, H3, BulletList, OrderedList, CodeBlock, Blockquote],
} = PresetButtons;

const { result } = renderHook(() => useEditor({ extensions }));

describe("Buttons", () => {
  it("render a Bold button", () => {
    const { container } = render(<Bold editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a Italic button", () => {
    const { container } = render(<Italic editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a RedMark button", () => {
    const { container } = render(<RedMark editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a YellowMark button", () => {
    const { container } = render(<YellowMark editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(container).toMatchSnapshot();
  });

  it.skip("render a GreenMark button", () => {
    const { container } = render(<GreenMark editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a BlueMark button", () => {
    const { container } = render(<BlueMark editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a Strike button", () => {
    const { container } = render(<Strike editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a H1 button", () => {
    const { container } = render(<H1 editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a H2 button", () => {
    const { container } = render(<H2 editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a H3 button", () => {
    const { container } = render(<H3 editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(container).toMatchSnapshot();
  });

  it.skip("render a BulletList button", () => {
    const { container } = render(<BulletList editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a OrderedList button", () => {
    const { container } = render(<OrderedList editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a CodeBlock button", () => {
    const { container } = render(<CodeBlock editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a Blockquote button", () => {
    const { container } = render(<Blockquote editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });

  it.skip("render a Blockquote button", () => {
    const { container } = render(<Blockquote editor={result.current!} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));

    expect(container).toMatchSnapshot();
  });
});
