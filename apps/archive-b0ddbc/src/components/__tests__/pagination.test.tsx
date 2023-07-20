import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, renderHook } from "@testing-library/react";
import Pagination from "@/components/pagination";
import { useState } from "react";

describe("Pagination", () => {
  it("renders a Pagination", () => {
    const hookResult = renderHook(() => useState(0));
    const { container } = render(
      <Pagination setSize={hookResult.result.current[1]} length={3} />
    );

    expect(screen.getAllByRole("button")).toHaveLength(5);
    expect(
      screen.getByRole("button", { name: "Previous Page" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Next Page" })
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("render a Pagination then lengh <= 1", () => {
    const hookResult = renderHook(() => useState(0));
    const { container } = render(
      <Pagination setSize={hookResult.result.current[1]} length={0} />
    );

    expect(screen.queryAllByRole("button")).toHaveLength(0);

    expect(container).toMatchSnapshot();
  });

  it.skip("try cleck pages buttons", async () => {
    const hookResult = renderHook(() => useState(0));
    render(<Pagination setSize={hookResult.result.current[1]} length={3} />);

    expect(screen.getByRole("button", { name: "1" })).toHaveClass("btn-active");

    fireEvent.click(screen.getByRole("button", { name: "2" }));

    await waitFor(() => expect(hookResult.result.current[0]).toBe(1));
  });

  it.skip("try cleck last/next buttons", async () => {
    const hookResult = renderHook(() => useState(0));
    render(<Pagination setSize={hookResult.result.current[1]} length={3} />);

    expect(screen.getByRole("button", { name: "1" })).toHaveClass("btn-active");

    fireEvent.click(screen.getByRole("button", { name: "Previous Page" }));

    await waitFor(() => expect(hookResult.result.current[0]).toBe(0));

    fireEvent.click(screen.getByRole("button", { name: "Next Page" }));

    await waitFor(() => expect(hookResult.result.current[0]).toBe(1));
  });
});
