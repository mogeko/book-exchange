import { type BookType } from "@/lib/hooks/useBooks";
import Skeleton from "@/components/base/skeleton";
import Image from "next/image";

const BookInfo: React.FC<BookInfoProps> = ({ title, cover, mate }) => (
  <div className="my-4 flex w-full gap-3">
    <figure
      className="flex items-center justify-center"
      aria-label="Cover Image"
    >
      <div className="relative w-32 h-48">
        <Image src={cover!} layout="fill" alt={title} />
      </div>
    </figure>
    <div className="flex flex-col">
      {Object.entries(mate ?? {}).map(([itemName, value], i) => {
        if (itemName === "paperback" || itemName === "hardcover") {
          return (
            <div key={i} className="inline-flex gap-1 text-base">
              <span className="capitalize">{itemName}:</span>
              <span>{value} pages</span>
            </div>
          );
        }
        if (itemName === "publication_date") {
          return (
            <div key={i} className="inline-flex gap-1 text-base">
              <span className="capitalize">{itemName}:</span>
              <span>{new Date(value).getFullYear()}</span>
            </div>
          );
        }
        if (itemName === "isbn") {
          return (
            <div key={i} className="inline-flex gap-1 text-base">
              <span className="uppercase">{itemName}:</span>
              <span>{value}</span>
            </div>
          );
        }
        return (
          <div key={i} className="inline-flex gap-1 text-base">
            <span className="capitalize">{itemName}:</span>
            <span>{value}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export const BookInfoSkeleton: React.FC = () => (
  <div className="my-4 flex w-full gap-3">
    <Skeleton.Square className="relative w-32 h-48" />
    <div className="flex flex-col gap-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="inline-flex gap-2">
          <Skeleton.Line className="w-14" />
          <Skeleton.Line className="w-32" />
        </div>
      ))}
    </div>
  </div>
);

type BookInfoProps = Partial<Pick<BookType, "mate" | "cover" | "title">>;

export default BookInfo;
