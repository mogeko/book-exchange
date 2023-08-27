import type { Book, Series, Tag } from "@/lib/database";
import { cn } from "@/lib/utils";
import { Link } from "@/components/link";

export const BookDetails: React.FC<
  {
    book: { series: Series | null; tags: Tag[] } & Book;
  } & React.HTMLAttributes<HTMLElement>
> = async ({ book: _book, className, ...props }) => {
  // TODO: Fetch data from API
  const book = {
    format: "hardcover",
    pages: 315,
    weight: 6.4,
    dimensions: [8.5, 5.5, 1.1],
    isbn10: "9780062871352",
    oclc: "1080268757",
    ..._book,
  }; // Mock data

  const physical = [
    { name: "Format", value: book.format },
    { name: "Pagination", value: `${book.pages} pages` },
    { name: "Dimensions", value: `${book.dimensions.join(" x ")} inches` },
    { name: "Item Weight", value: `${book.weight} ounces` },
  ];
  const ids = [
    { name: "ISBN 10", value: book.isbn10 },
    { name: "ISBN 13", value: book.isbn },
    {
      name: "OCLC/WorldCat",
      value: book.oclc,
      baseUrl: "https://www.worldcat.org/oclc/",
    },
  ];

  return (
    <aside
      className={cn("flex flex-col gap-5 pt-[3.25rem]", className)}
      {...props}
    >
      {book.series && (
        <div className="grid place-items-start gap-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Series
          </h4>
          <div className="text-muted-foreground inline-flex items-baseline gap-1 text-lg">
            <span>#</span>
            <Link href={`/series/${book.series.id}`}>{book.series.name}</Link>
          </div>
        </div>
      )}
      <div className="grid gap-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          The Physical Object
        </h4>
        <table className="table-auto">
          <tbody>
            {physical.map(({ name, value }) => {
              if (!value) return;
              return (
                <tr key={`the-physical-object-${name}`}>
                  <td className="font-semibold">{name}</td>
                  <td className="text-muted-foreground text-sm capitalize">
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid gap-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          ID Numbers
        </h4>
        <table className="table-auto">
          <tbody>
            {ids.map(({ name, value, baseUrl }) => {
              if (!value) return;
              return (
                <tr key={`id-numbers-${name}`}>
                  <td className="font-semibold">{name}</td>
                  <td className="text-muted-foreground text-sm capitalize">
                    {baseUrl ? (
                      <Link href={baseUrl + value}>{value}</Link>
                    ) : (
                      <span>{value}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid gap-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Keywords
        </h4>
        <div className="flex flex-wrap gap-2">
          {book.tags.map((tag) => (
            <Link
              key={`keyword-${tag.id}`}
              href={`/tag/${tag.id}`}
              variant="badge"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
