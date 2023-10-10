import type { Book } from "@/lib/database";
import { BookArtwork } from "@/components/book-artwork";

export const UserBookshelf: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <div
          key={`book-${book.id}`}
          className="flex items-center justify-center"
        >
          <BookArtwork className="m-6" book={{ authors: [], ...book }} />
        </div>
      ))}
    </div>
  );
};
