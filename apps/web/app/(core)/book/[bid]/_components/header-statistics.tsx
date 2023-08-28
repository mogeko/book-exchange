import { BsDot } from "react-icons/bs";

import { prisma } from "@/lib/database";
import { RatingStars } from "@/components/rating-stars";

export const Statistics: React.FC<{ bid: number }> = async ({ bid }) => {
  const {
    _count: { rate: ratingCount },
    _avg: { rate: rating },
  } = await prisma.score.aggregate({
    where: { bookId: bid },
    _count: { rate: true },
    _avg: { rate: true },
  });

  return (
    <div className="flex flex-row items-center justify-start gap-2 overflow-hidden">
      {rating && (
        <>
          <RatingStars rating={rating} className="h-5 w-5 text-[#FFAC2D]" />
          <div className="text-base font-medium">
            {rating.toFixed(1)}
            <span className="text-muted-foreground select-none"> / 10</span>
          </div>
          <BsDot className="text-muted-foreground" />
        </>
      )}
      {ratingCount && <span>{ratingCount} ratings</span>}
    </div>
  );
};
