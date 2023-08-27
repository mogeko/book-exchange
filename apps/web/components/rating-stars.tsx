import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

import { cn } from "@/lib/utils";

export const RatingStars: React.FC<{
  className?: string;
  rating: number;
}> = ({ rating, className }) => {
  const classes = cn("h-4 w-4", className);

  return (
    <div className="inline-flex flex-row items-center justify-center">
      {Array.from({ length: 5 }, (_, i) => {
        if (rating / 2 >= i + 1) {
          return <TiStarFullOutline key={`rating-${i}`} className={classes} />;
        } else if (rating / 2 >= i + 0.5) {
          return <TiStarHalfOutline key={`rating-${i}`} className={classes} />;
        } else {
          return <TiStarOutline key={`rating-${i}`} className={classes} />;
        }
      })}
    </div>
  );
};
