import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@/lib/test-utils";
import useQuery, { useQueryInfinite } from "@/lib/hooks/useQuery";

describe("useQuery", () => {
  it("should be defined", () => {
    expect(useQuery).toBeDefined();
  });

  it("should return data", async () => {
    const { result } = renderHook(() => useQuery("/api/books"));

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data).toHaveLength(10);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });

    expect(result.current).toMatchSnapshot();
  });
});

describe("useBooksInfinite", () => {
  it("should be defined", () => {
    expect(useQueryInfinite).toBeDefined();
  });

  it("should return data", async () => {
    const { result } = renderHook(() =>
      useQueryInfinite((index) => `/api/books?page=${index}`)
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data?.[0]).toHaveLength(10);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });

    expect(result.current).toMatchSnapshot();
  });
});
