import handleQuery from "@/lib/utils/handleQuery";

describe("queryTools", () => {
  it("should return a query string", () => {
    expect(handleQuery("/test", { limit: 10, page: 1 })).toBe(
      "/test?limit=10&page=1"
    );
  });
});
