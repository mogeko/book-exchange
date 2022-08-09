import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@/lib/test-utils";
import useComments, { useComment } from "@/lib/hooks/useComments";

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

describe("useComment", () => {
  it("should be defined", () => {
    expect(useComment).toBeDefined();
  });

  it("should return comment", async () => {
    const { result } = renderHook(() => useComment("cm100000-1"));

    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.data?.id).toEqual("cm100000-1");
      expect(result.current.data).toHaveProperty("msg");
    });

    expect(result.current).toMatchSnapshot();
  });

  it("should return undefined when comment ID not found", async () => {
    const { result } = renderHook(() => useComment());

    expect(result.current.data).toBeUndefined();

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
    });

    expect(result.current).toMatchSnapshot();
  });
});
