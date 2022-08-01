import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useRouterMock from "@/__mocks__/useRouter";
import * as tagsCotroller from "@/layouts/tagsCotroller";
import * as bookList from "@/components/books/bookList";
import Tags from "@/pages/tags/[tag]";

describe("Tags", () => {
  beforeAll(() => {
    useRouterMock.returnResult({ query: { tag: "test" } });
    jest.spyOn(tagsCotroller, "default").mockImplementation(() => <></>);
    jest.spyOn(bookList, "default").mockImplementation(() => <></>);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders a Tags", () => {
    render(<Tags />);

    expect(useRouterMock.target).toBeCalledWith();
    expect(bookList.default).toBeCalled();
    expect(
      screen.getByRole("heading", { name: /Tag: test/i })
    ).toBeInTheDocument();
  });
});
