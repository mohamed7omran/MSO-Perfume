"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, MessageSquare, Tag, Loader2 } from "lucide-react";
import ReviewsCarousel from "@/components/reviews-carousel";
import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        // Get first 3 products for featured section
        setFeaturedProducts(allProducts.slice(0, 3));
      } catch (err) {
        setError("حدث خطأ أثناء تحميل المنتجات");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Image
          src="/logo.png?height=1080&width=1920"
          alt="عطور العمران"
          fill
          priority
          className="object-cover"
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            عطور العمران
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-white md:text-2xl">
            عطور فاخرة بلمسة عربية أصيلة
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="text-lg">
              <Link href="/contact">تواصل معنا</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">من نحن؟</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              نحن في عطور العمران نقدم لكم تشكيلة فريدة من العطور الفاخرة
              المصنوعة بعناية فائقة من أجود المكونات الطبيعية. تجمع عطورنا بين
              الأصالة العربية والحداثة العالمية لتمنحكم تجربة عطرية لا تُنسى.
            </p>
            <div className="mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/about">اقرأ المزيد عنا</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center md:text-4xl">
            منتجاتنا المميزة
          </h2>

          {loading ? (
            <div className="mt-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="mr-2">جاري تحميل المنتجات...</span>
            </div>
          ) : error ? (
            <div className="mt-8 rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
              {error}
            </div>
          ) : featuredProducts.length === 0 ? (
            <p className="mt-8 text-center text-muted-foreground">
              لا توجد منتجات متاحة حالياً
            </p>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg"
                >
                  {product.isNew && (
                    <Badge className="absolute right-4 top-4 z-10">جديد</Badge>
                  )}

                  {product.price > product.discountedPrice && (
                    <div className="absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-destructive font-bold text-destructive-foreground">
                      {Math.round(
                        ((product.price - product.discountedPrice) /
                          product.price) *
                          100
                      )}
                      %
                    </div>
                  )}

                  <div className="aspect-square overflow-hidden rounded-md bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {product.description}
                    </p>

                    <div className="mt-3 flex justify-center">
                      {product.price > product.discountedPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm line-through text-muted-foreground">
                            {product.price}جنيه
                          </span>
                          <span className="text-lg font-bold text-destructive">
                            {product.discountedPrice}جنيه
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">
                          {product.price}جنيه
                        </span>
                      )}
                    </div>

                    {product.offer && (
                      <div className="mt-3 flex items-center justify-center gap-2 rounded-md bg-primary/10 p-2 text-sm">
                        <Tag className="h-4 w-4 text-primary" />
                        <span>{product.offer}</span>
                      </div>
                    )}

                    <Button asChild className="mt-4 w-full">
                      <Link
                        href="https://wa.me/+201030576522"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageSquare className="ml-2 h-4 w-4" />
                        تواصل للطلب
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">عرض جميع المنتجات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">آراء العملاء</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              اطلع على تجارب وآراء عملائنا الكرام مع عطور العمران
            </p>
          </div>
          <div className="mt-12">
            <ReviewsCarousel />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/reviews">عرض جميع التقييمات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">تواصل معنا</h2>
            <p className="mt-6 text-lg">
              نحن سعداء بالإجابة على استفساراتكم وتلبية طلباتكم. تواصلوا معنا
              عبر وسائل التواصل الاجتماعي أو من خلال نموذج الاتصال.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link
                  href="https://wa.me/+201030576522"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="ml-2 h-5 w-5" />
                  واتساب
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link
                  href="https://instagram.com/elomranperfume"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="ml-2 h-5 w-5" />
                  انستغرام
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link
                  href="https://facebook.com/elomranperfume"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="ml-2 h-5 w-5" />
                  فيسبوك
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
