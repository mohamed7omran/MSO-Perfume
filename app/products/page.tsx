"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageSquare, Tag, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل المنتجات");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-2">جاري تحميل المنتجات...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
          {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">منتجاتنا</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            لا توجد منتجات متاحة حالياً، يرجى العودة لاحقاً.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold md:text-4xl">منتجاتنا</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            اكتشف تشكيلتنا المميزة من العطور الفاخرة المصنوعة من أجود المكونات
            الطبيعية
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/10"
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
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="text-left">
                    {product.price > product.discountedPrice ? (
                      <div className="flex flex-col items-end">
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
                </div>
                <p className="mt-2 text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-3 inline-block rounded-full bg-muted px-3 py-1 text-sm">
                  {product.notes}
                </div>

                {product.offer && (
                  <div className="mt-4 flex items-center gap-2 rounded-md bg-primary/10 p-2 text-sm">
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
      </div>
    </div>
  );
}
