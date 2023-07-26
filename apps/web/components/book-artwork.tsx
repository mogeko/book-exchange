import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const BookArtwork: React.FC<
  {
    book: Book;
    aspectRatio?: "portrait" | "square";
  } & React.HTMLAttributes<HTMLDivElement> &
    Pick<React.ComponentPropsWithoutRef<typeof Image>, "width" | "height">
> = ({ className, book, aspectRatio, width, height, ...props }) => {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Link href={`/book/${book.id}`} className="overflow-hidden rounded-md">
        <Image
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "square" ? "aspect-square" : "aspect-[3/4]"
          )}
          src={book.cover ?? "" /** TODO */}
          alt={book.title ?? "Some book"}
          width={width}
          height={height}
        />
      </Link>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{book.title}</h3>
        <p className="text-xs text-muted-foreground">
          {book.authors?.[0].name}
        </p>
      </div>
    </div>
  );
};

type Book = {
  id: string;
  authors: { name: string }[];
  cover: string | null;
  title: string;
};
