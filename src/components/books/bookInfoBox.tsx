import type { BookType } from "@/lib/hooks/useBooks";
import Skeleton from "@/components/base/skeleton";
import Image from "next/image";
import dayjs from "dayjs";

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
    <div className="flex flex-col prose">
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
              <span className="capitalize">Publication Date:</span>
              <span>{dayjs(value).format("YYYY-MM-DD")}</span>
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
    <Skeleton.Square className="relative w-32 aspect-2/3" />
    <div className="flex flex-col gap-2  w-full">
      <Skeleton.Line className="w-2/5 h-4" count={3} />
    </div>
  </div>
);

type BookInfoProps = Partial<Pick<BookType, "mate" | "cover" | "title">>;

export default BookInfo;
