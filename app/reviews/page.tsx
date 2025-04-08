"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewFormModal } from "@/components/review-form-modal";

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "أحمد محمد",
    avatar: "/avatar.png",
    rating: 5,
    date: "15 مارس 2024",
    review: "العطر ريحته حلوة وبتقعد وقت كويس. دي أول مرة أجربه وبصراحة عجبني.",
    product: "عطر تمبتيشن",
  },
  {
    id: 2,
    name: "سارة علي",
    avatar: "/avatar.png",
    rating: 4,
    date: "2 أبريل 2024",
    review: "ريحته ناعمة ولطيفة، استخدمته في خروجة وكل الناس كانت بتسألني عنه.",
    product: "شانيل N°5",
  },
  {
    id: 3,
    name: "خالد عبدالله",
    avatar: "/avatar.png",
    rating: 5,
    date: "20 فبراير 2024",
    review: "الطلب وصل بسرعة، والتغليف كان كويس. العطر نفسه فخم ومميز.",
    product: "جنتلمان أونلي",
  },
  {
    id: 4,
    name: "نورة سعد",
    avatar: "/avatar.png",
    rating: 5,
    date: "5 مايو 2024",
    review: "جبت العطر هدية لجوزي، وعجبته الريحة جداً. ريحة واضحة وبتثبت.",
    product: "دينيم كولكشن",
  },
  {
    id: 5,
    name: "محمد العلي",
    avatar: "/avatar.png",
    rating: 4,
    date: "10 يناير 2024",
    review: "جودة العطر كويسة وريحتُه مميزة. مناسب للمناسبات.",
    product: "بنتلي مومنتوم",
  },
  {
    id: 6,
    name: "فاطمة محمد",
    avatar: "/avatar.png",
    rating: 5,
    date: "25 مارس 2024",
    review: "ريحته ناعمة وبسيطة، وحسيت إنه لايق عليا جداً. اختيار موفق.",
    product: "عطر عمران الخاص",
  },
  {
    id: 7,
    name: "عبدالرحمن سعيد",
    avatar: "/avatar.png",
    rating: 5,
    date: "12 أبريل 2024",
    review: "الخدمة كانت ممتازة والعطر شكله شيك وريحتُه عجبتني.",
    product: "عطر تمبتيشن",
  },
  {
    id: 8,
    name: "هند أحمد",
    avatar: "/avatar.png",
    rating: 4,
    date: "8 فبراير 2024",
    review: "العطر حلو وريحته بتثبت، والتوصيل جالي بسرعة.",
    product: "شانيل N°5",
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

export default function ReviewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-12 rounded-lg border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold">Share Your Opinion</h2>
          <p className="mt-4 text-muted-foreground">
            {" "}
            We value our customers' feedback and are always striving to improve
            our products and services. Share your experience with Omran
            Perfumes.
          </p>
          <div className="mt-6">
            <Button size="lg" onClick={() => setIsModalOpen(true)}>
              Submit Your Review
            </Button>
          </div>
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Customer Reviews</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Take a look at what our valued customers have to say about Omran
            Perfumes.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-lg border bg-background p-6 transition-all hover:shadow-md dark:hover:shadow-primary/5"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={review.avatar || "/placeholder.svg"}
                  alt={review.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold">{review.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <div className="mt-1">
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {review.product}
                    </span>
                  </p>
                  <p className="mt-2">{review.review}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReviewFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
