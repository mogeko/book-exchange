"use client";

import { cn } from "@/lib/utils";
import { BookArtwork } from "@/components/book-artwork";
import { useBooksContext } from "@/app/(authorized)/made4u/_components/books-context";

export const BooksShowcase: React.FC<{
  className?: string;
}> = ({ className }) => {
  const { books } = useBooksContext();

  if (books.length) {
    return (
      <div
        className={cn("grid gap-3 md:grid-cols-4 lg:grid-cols-5", className)}
      >
        {books.map((book) => (
          <BookArtwork
            key={`made4u-book-${book.id}`}
            book={book}
            className="w-[200px]"
            width={200}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <h3 className="mt-4 text-lg font-semibold">There is no content yet</h3>
        <p className="text-muted-foreground mb-4 mt-2 text-sm">
          Sorry, today we don&apos;t have any books for you.
        </p>
      </div>
    </div>
  );
};
