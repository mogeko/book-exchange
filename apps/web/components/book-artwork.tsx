import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const BookArtwork: React.FC<
  {
    book: Book;
    aspectRatio?: "portrait" | "square";
    width?: number;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, book, aspectRatio = "portrait", width = 250, ...props }) => {
  return (
    <div className={cn("space-y-3", className ?? "w-[250px]")} {...props}>
      <Link href={`/book/${book.id}`} className="overflow-hidden rounded-md">
        <Image
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
          src={book.cover ?? "" /** TODO */}
          height={aspectRatio === "square" ? width : (width / 3) * 4}
          width={width}
          alt={book.title ?? "Some book"}
        />
      </Link>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{book.title}</h3>
        <p className="text-xs text-muted-foreground truncate">
          {book.authors?.map((author) => author.name).join(" / ")}
        </p>
      </div>
    </div>
  );
};

export type Book = {
  id: number;
  authors: { name: string }[];
  cover: string | null;
  title: string;
};
