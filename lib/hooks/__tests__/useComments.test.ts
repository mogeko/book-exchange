import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@/lib/test-utils";
import useComments from "@/lib/hooks/useComments";

describe("useComments", () => {
  it("should be defined", () => {
    expect(useComments).toBeDefined();
  });

  it("should return comment", async () => {
    const { result } = renderHook(() => useComments());

    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data).toHaveLength(20);
      result.current.data?.forEach((comment) => {
        comment.responds.forEach((subComment, i) => {
          expect(subComment.id).toEqual(`${comment.id}-${i + 1}`);
        });
      });
    });

    expect(result.current).toMatchSnapshot();
  });
});
