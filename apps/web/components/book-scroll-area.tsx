import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookArtwork, type Book } from "@/components/book-artwork";

export const BookScrollArea: React.FC<
  {
    title: string;
    description: string;
    books: Book[];
  } & Omit<React.ComponentPropsWithoutRef<typeof BookArtwork>, "book">
> = ({ title, description, books, ...props }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea className="flex space-x-4 pb-4">
          <div className="flex space-x-4 pb-4">
            {books.map((book) => (
              <BookArtwork key={`${title}-${book.id}`} book={book} {...props} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
