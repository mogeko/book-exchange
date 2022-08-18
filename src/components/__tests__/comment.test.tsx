import "@testing-library/jest-dom";
import { render, screen, renderHook } from "@testing-library/react";

describe("Submit Comment", () => {
  it("should submit data", async () => {
    const example = {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Example heading" }],
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Example Text" }],
        },
      ],
    };
    const result = await fetch("/api/comments/submit", {
      method: "POST",
      body: JSON.stringify({ content: example }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(result.status).toEqual(200);
  });
});
