import "@testing-library/jest-dom";
import { render, screen } from "@/lib/utils/testTools";
import Card, { LongCard } from "@/components/base/card";

describe("Card", () => {
  it("renders a book card correctly", async () => {
    const [exampleData] = await fetch("/api/books").then((res) => res.json());
    const { container } = render(<Card {...exampleData} />);

    expect(
      screen.getByRole("figure", { name: "Cover Image" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: screen.getByRole("heading").innerHTML })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);

    expect(container).toMatchSnapshot();
  });

  it("snapshot a book skeleton card", () => {
    const { container } = render(<Card.Skeleton />);

    expect(container).toMatchSnapshot();
  });

  it("render a long card", async () => {
    const [exampleData] = await fetch("/api/books").then((res) => res.json());
    const { container } = render(<LongCard {...exampleData} />);

    expect(
      screen.getByRole("figure", { name: "Cover Image" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: screen.getByRole("heading").innerHTML })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);

    expect(container).toMatchSnapshot();
  });

  it("snapshot a long card skeleton", () => {
    const { container } = render(<LongCard.Skeleton />);

    expect(container).toMatchSnapshot();
  });
});
