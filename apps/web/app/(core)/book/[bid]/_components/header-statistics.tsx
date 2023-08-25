import { BsDot } from "react-icons/bs";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

import { prisma } from "@/lib/database";

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
          <div className="inline-flex flex-row items-center justify-center text-[#FFAC2D]">
            {Array.from({ length: 5 }, (_, i) => {
              if (rating / 2 >= i + 1) {
                return (
                  <TiStarFullOutline key={`rating-${i}`} className="h-5 w-5" />
                );
              } else if (rating / 2 >= i + 0.5) {
                return (
                  <TiStarHalfOutline key={`rating-${i}`} className="h-5 w-5" />
                );
              } else {
                return (
                  <TiStarOutline key={`rating-${i}`} className="h-5 w-5" />
                );
              }
            })}
          </div>
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
