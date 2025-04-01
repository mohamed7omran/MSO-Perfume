"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type StarRatingInputProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
};

export function StarRatingInput({
  rating,
  onRatingChange,
}: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={cn(
            "h-8 w-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "transition-transform hover:scale-110"
          )}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(star)}
          aria-label={`تقييم ${star} من 5`}
        >
          <Star
            className={cn(
              "h-full w-full transition-colors",
              (hoverRating || rating) >= star
                ? "fill-primary stroke-primary"
                : "fill-muted stroke-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );
}
