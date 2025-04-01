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
    review:
      "من أفضل العطور التي جربتها، رائحة فريدة ومميزة تدوم لفترة طويلة. أنصح الجميع بتجربة عطور العمران.",
    product: "عطر تمبتيشن",
  },
  {
    id: 2,
    name: "سارة علي",
    avatar: "/avatar.png",
    rating: 4,
    date: "2 أبريل 2024",
    review:
      "عطر رائع بمكونات طبيعية ورائحة جذابة. استخدمته في مناسبة خاصة وتلقيت الكثير من الإطراء.",
    product: "شانيل N°5",
  },
  {
    id: 3,
    name: "خالد عبدالله",
    avatar: "/avatar.png",
    rating: 5,
    date: "20 فبراير 2024",
    review:
      "تجربة شراء ممتازة والتوصيل كان سريعاً. العطر فاخر جداً ويستحق السعر. سأكرر التجربة مع عطور أخرى من العمران.",
    product: "جنتلمان أونلي",
  },
  {
    id: 4,
    name: "نورة سعد",
    avatar: "/avatar.png",
    rating: 5,
    date: "5 مايو 2024",
    review:
      "أهديت هذا العطر لزوجي في عيد ميلاده وأحبه كثيراً. رائحته قوية ومميزة وتدوم طويلاً.",
    product: "دينيم كولكشن",
  },
  {
    id: 5,
    name: "محمد العلي",
    avatar: "/avatar.png",
    rating: 4,
    date: "10 يناير 2024",
    review:
      "عطر فاخر بمكونات عالية الجودة. أستخدمه للمناسبات الخاصة وأتلقى دائماً تعليقات إيجابية.",
    product: "بنتلي مومنتوم",
  },
  {
    id: 6,
    name: "فاطمة محمد",
    avatar: "/avatar.png",
    rating: 5,
    date: "25 مارس 2024",
    review:
      "من أفضل العطور النسائية التي جربتها. رائحة ناعمة وأنيقة تدوم طوال اليوم. سعيدة جداً بهذا الاختيار.",
    product: "عطر العمران الخاص",
  },
  {
    id: 7,
    name: "عبدالرحمن سعيد",
    avatar: "/avatar.png",
    rating: 5,
    date: "12 أبريل 2024",
    review:
      "خدمة عملاء ممتازة وتوصيل سريع. العطر رائع والعبوة أنيقة جداً. تجربة شراء مميزة.",
    product: "عطر تمبتيشن",
  },
  {
    id: 8,
    name: "هند أحمد",
    avatar: "/avatar.png",
    rating: 4,
    date: "8 فبراير 2024",
    review:
      "عطر جميل ومميز، رائحته تدوم لفترة طويلة. التغليف أنيق والتوصيل كان سريعاً.",
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
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">آراء العملاء</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            اطلع على تجارب وآراء عملائنا الكرام مع عطور العمران
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

        <div className="mt-12 rounded-lg border bg-muted/30 p-8 text-center">
          <h2 className="text-2xl font-bold">شاركنا رأيك</h2>
          <p className="mt-4 text-muted-foreground">
            نحن نقدر آراء عملائنا ونسعى دائماً لتحسين منتجاتنا وخدماتنا. شاركنا
            تجربتك مع عطور العمران.
          </p>
          <div className="mt-6">
            <Button size="lg" onClick={() => setIsModalOpen(true)}>
              أرسل رأيك
            </Button>
          </div>
        </div>
      </div>

      <ReviewFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
