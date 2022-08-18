import type { BooksType } from "@/lib/hooks/useBooks";
import Skeleton from "@/components/base/skeleton";
import StarsRate from "@/components/stars";
import Image from "next/image";
import Link from "next/link";

const CardRoot: React.FC<CardProps> = ({ title, cover, mate, id }) => {
  return (
    <div className="relative flex flex-col w-full">
      <figure
        className="flex justify-center items-center"
        aria-label="Cover Image"
      >
        <Link href={`/books/${id}`}>
          <a className="relative w-full aspect-2/3">
            <Image src={cover!} layout="fill" alt={title} />
          </a>
        </Link>
      </figure>
      <div className="flex flex-col text-sm">
        <Link href={`/books/${id}`}>
          <a className="link no-underline text-primary hover:bg-primary hover:text-primary-content focus:bg-primary-focus focus:text-primary-content">
            <h2 className="truncate">{title}</h2>
          </a>
        </Link>
        <p className="truncate">{mate.author}</p>
      </div>
    </div>
  );
};

const CardSkeleton: React.FC = () => (
  <Skeleton className="flex flex-col w-full">
    <Skeleton.Square className="w-full aspect-2/3" />
    <Skeleton.Line count={2} />
  </Skeleton>
);

const LongCardRoot: React.FC<CardProps> = (props) => {
  const { title, cover, mate, desc, id, rates } = props;
  return (
    <div className="flex py-4 gap-3">
      <figure
        className="flex justify-center items-center"
        aria-label="Cover Image"
      >
        <Link href={`/books/${id}`}>
          <a className="relative w-28 aspect-2/3">
            <Image src={cover!} layout="fill" alt={title} />
          </a>
        </Link>
      </figure>
      <div className="flex flex-col gap-2">
        <div className="inline-flex justify-start">
          <Link href={`/books/${id}`}>
            <a className="link no-underline text-primary hover:bg-primary hover:text-primary-content focus:bg-primary-focus focus:text-primary-content">
              <h2 className="truncate">{title}</h2>
            </a>
          </Link>
        </div>
        <p className="truncate">{mate.author}</p>
        <StarsRate rates={rates!} />
        <p className="line-clamp-3 text-ellipsis">{desc?.text}</p>
      </div>
    </div>
  );
};

const LongCardSkeleton: React.FC = () => (
  <Skeleton className="flex py-4 gap-3">
    <Skeleton.Square className="w-28 aspect-2/3" />
    <div className="flex flex-col gap-2 w-full">
      <Skeleton.Line className="w-3/4 h-4" />
      <Skeleton.Line className="w-1/2 h-4" />
    </div>
  </Skeleton>
);

const Card = Object.assign(CardRoot, { Skeleton: CardSkeleton });
export const LongCard = Object.assign(LongCardRoot, {
  Skeleton: LongCardSkeleton,
});

type CardProps = BooksType[0];

export default Card;
