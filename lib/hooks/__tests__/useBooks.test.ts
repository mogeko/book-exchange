import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@/lib/utils/testTools";
import useBooks, { useBook, useBooksInfinite } from "@/lib/hooks/useBooks";

describe("useBooks", () => {
  it("should be defined", () => {
    expect(useBooks).toBeDefined();
  });

  it("should return books", async () => {
    const { result } = renderHook(() => useBooks());

    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data).toHaveLength(10);
    });

    expect(result.current).toMatchSnapshot();
  });
});

describe("useBook", () => {
  it("should be defined", () => {
    expect(useBook).toBeDefined();
  });

  it("should return book", async () => {
    const { result } = renderHook(() => useBook("bk1000"));

    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data?.id).toBe("bk1000");
    });

    expect(result.current).toMatchSnapshot();
  });

  it("return null when book ID is undefined", async () => {
    const { result } = renderHook(() => useBook());

    expect(result.current.data).toBeUndefined();

    await waitFor(() => expect(result.current.data).toBeUndefined());
  });
});

describe("useBooksInfinite", () => {
  it("should be defined", () => {
    expect(useBooksInfinite).toBeDefined();
  });

  it("should return books", async () => {
    const { result } = renderHook(() => useBooksInfinite());

    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data?.[0]).toHaveLength(10);
    });

    expect(result.current).toMatchSnapshot();
  });

  it("return books when query has param", async () => {
    const { result } = renderHook(() => useBooksInfinite({ limit: 5 }));

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data?.[0]).toHaveLength(5);
    });
  });
});
