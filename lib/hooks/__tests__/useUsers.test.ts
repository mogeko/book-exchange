import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@/lib/test-utils";
import { useUser } from "@/lib/hooks/useUsers";

describe("useUsers", () => {
  it("should be defined", () => {
    expect(useUser).toBeDefined();
  });

  it("should return data", async () => {
    const { result } = renderHook(() => useUser("1000"));

    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data?.uid).toBe("1000");
    });

    expect(result.current).toMatchSnapshot();
  });

  it("return data if uid is empty", async () => {
    const { result } = renderHook(() => useUser());

    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
    });
  });
});
