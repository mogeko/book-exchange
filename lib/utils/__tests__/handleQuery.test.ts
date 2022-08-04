import handleQuery from "@/lib/utils/handleQuery";

describe("queryTools", () => {
  it("should return a query string", () => {
    const query = handleQuery("/test", { limit: 10, page: 1 });

    expect(query).toBe("/test?limit=10&page=1");
  });

  it("should return a query string with array query", () => {
    const query = handleQuery("/test", { tag: ["a", null, "b"] });

    expect(query).toBe("/test?tag=a&tag=b");
  });
});
