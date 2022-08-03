import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@/lib/utils/testTools";
import useMessage from "@/lib/hooks/useMessage";

describe("useMessage", () => {
  it("should be defined", () => {
    expect(useMessage).toBeDefined();
  });

  it("snapshot message", async () => {
    const { result } = renderHook(() => useMessage());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current).toMatchSnapshot();
  });
});
