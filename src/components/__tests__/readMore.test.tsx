import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@/lib/utils/testTools";
import withReadMore from "@/components/readMore";

const ReadMore = withReadMore(({ children }) => <div>{children}</div>);
const exampleData = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  is_folded: true,
};

describe("ReadMore", () => {
  it("renders a ReadMore without ReadMore button", async () => {
    const { container } = render(
      <ReadMore
        foldedData={{ ...exampleData, is_folded: false }}
        url="/api/books/bk1000/desc"
      />
    );

    expect(screen.getByText(exampleData.text)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("renders a ReadMore with ReadMore button", () => {
    const { container } = render(
      <ReadMore foldedData={exampleData} url="/api/books/bk1000/desc" />
    );

    expect(screen.getByText(exampleData.text)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /read more/i })
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it("renders a ReadMore with ReadLess button", async () => {
    const { container } = render(
      <ReadMore foldedData={exampleData} url="/api/books/bk1000/desc" />
    );
    fireEvent.click(screen.getByRole("button", { name: /read more/i }));

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole(exampleData.text)).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /read less/i })
      ).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });
});
