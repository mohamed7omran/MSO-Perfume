"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sample featured reviews
const featuredReviews = [
  {
    id: 1,
    name: "أحمد محمد",
    avatar: "/avatar.png",
    rating: 5,
    review:
      "من أفضل العطور التي جربتها، رائحة فريدة ومميزة تدوم لفترة طويلة. أنصح الجميع بتجربة عطور عمران.",
    product: "عطر تمبتيشن",
  },
  {
    id: 2,
    name: "سارة علي",
    avatar: "/avatar.png",
    rating: 4,
    review:
      "عطر رائع بمكونات طبيعية ورائحة جذابة. استخدمته في مناسبة خاصة وتلقيت الكثير من الإطراء.",
    product: "شانيل N°5",
  },
  {
    id: 3,
    name: "خالد عبدالله",
    avatar: "/avatar.png",
    rating: 5,
    review:
      "تجربة شراء ممتازة والتوصيل كان سريعاً. العطر فاخر جداً ويستحق السعر. سأكرر التجربة مع عطور أخرى من عمران.",
    product: "جنتلمان أونلي",
  },
];

// Helper function to render stars
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating
              ? "fill-primary stroke-primary"
              : "fill-muted stroke-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
};

export default function ReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === featuredReviews.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const goToNext = () => {
    setAutoplay(false);
    setActiveIndex((current) =>
      current === featuredReviews.length - 1 ? 0 : current + 1
    );
  };

  const goToPrevious = () => {
    setAutoplay(false);
    setActiveIndex((current) =>
      current === 0 ? featuredReviews.length - 1 : current - 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-6 md:p-8">
      <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 md:left-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur md:h-10 md:w-10"
          onClick={goToPrevious}
          aria-label="السابق"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>

      <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 md:right-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur md:h-10 md:w-10"
          onClick={goToNext}
          aria-label="التالي"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>

      <div className="relative h-[300px] overflow-hidden">
        {featuredReviews.map((review, index) => (
          <div
            key={review.id}
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-500",
              activeIndex === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          >
            <Image
              src={review.avatar || "/placeholder.svg"}
              alt={review.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <h3 className="mt-4 text-xl font-bold">{review.name}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {review.product}
            </p>
            <div className="mt-2">
              <RatingStars rating={review.rating} />
            </div>
            <p className="mt-4 max-w-2xl text-lg">{review.review}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {featuredReviews.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              activeIndex === index ? "bg-primary w-4" : "bg-muted"
            )}
            onClick={() => {
              setAutoplay(false);
              setActiveIndex(index);
            }}
            aria-label={`انتقل إلى التقييم ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
