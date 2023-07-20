import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@/lib/test-utils";
import useTags from "@/lib/hooks/useTags";

describe("useTags", () => {
  it("should be defined", () => {
    expect(useTags).toBeDefined();
  });

  it("snapshot tags", async () => {
    const { result } = renderHook(() => useTags());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current).toMatchSnapshot();
  });
});
