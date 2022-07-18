import { type BookTypes } from "@/lib/hooks/useBooks";
import Skeleton from "@/components/skeleton";
import StarsRate from "@/components/stars";
import Image from "next/image";
import Link from "next/link";

const CardRoot: React.FC<CardProps> = ({ title, cover, author, id }) => {
  return (
    <div className="relative flex flex-col w-28">
      <figure className="flex justify-center items-center">
        <Link href={`/books/${id}`}>
          <a className="relative w-28 h-[calc(7rem/2*3)]">
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
        <p className="truncate">{author}</p>
      </div>
    </div>
  );
};

const CardSkeleton: React.FC = () => (
  <Skeleton.Pulse className="relative flex flex-col mb-4 w-28">
    <Skeleton.Square className="mb-2 w-28 h-[calc(7rem/2*3)]" />
    <Skeleton.Line className="mb-2 w-24" />
    <Skeleton.Line className="mb-2 w-20" />
  </Skeleton.Pulse>
);

const LongCardRoot: React.FC<CardProps> = (props) => {
  const { title, cover, author, id, description, rates } = props;
  return (
    <div className="flex py-4 gap-3">
      <figure className="flex justify-center items-center">
        <Link href={`/books/${id}`}>
          <a className="relative w-28 h-[calc(7rem/2*3)]">
            <Image src={cover!} layout="fill" alt={title} />
          </a>
        </Link>
      </figure>
      <div className="flex flex-col gap-2 h-[calc(7rem/2*3)]">
        <div className="inline-flex justify-start">
          <Link href={`/books/${id}`}>
            <a className="link no-underline text-primary hover:bg-primary hover:text-primary-content focus:bg-primary-focus focus:text-primary-content">
              <h2 className="truncate">{title}</h2>
            </a>
          </Link>
        </div>
        <p className="truncate">{author}</p>
        <StarsRate rates={rates!} />
        <p className="line-clamp-3 text-ellipsis">{description}</p>
      </div>
    </div>
  );
};

const LongCardSkeleton: React.FC = () => (
  <Skeleton.Pulse className="relative flex mb-4 w-full gap-3">
    <Skeleton.Square className="mb-2 w-28 h-[calc(7rem/2*3)]" />
    <div className="flex flex-col w-full gap-2">
      <Skeleton.Line className="mb-2 w-1/5" />
      <Skeleton.Line className="mb-2 w-1/6" />
      <div>
        <Skeleton.Line className="mb-2 w-4/5" />
        <Skeleton.Line className="mb-2 w-4/5" />
        <Skeleton.Line className="mb-2 w-4/5" />
        <Skeleton.Line className="mb-2 w-4/6" />
      </div>
    </div>
  </Skeleton.Pulse>
);

const Card = Object.assign(CardRoot, { Skeleton: CardSkeleton });
export const LongCard = Object.assign(LongCardRoot, {
  Skeleton: LongCardSkeleton,
});

type CardProps = BookTypes;

export default Card;
