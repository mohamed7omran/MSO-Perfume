"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Facebook,
  MessageSquare,
  Tag,
  Loader2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import ReviewsCarousel from "@/components/reviews-carousel";
import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/lib/products";
import type { Product } from "@/types/product";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const collections = [
    {
      id: "men",
      name: "For Men",
      image: "/perfume4.png?height=600&width=400",
    },
    {
      id: "women",
      name: "For women",
      image: "/Flowerbomb.png?height=600&width=400",
    },
    {
      id: "all",
      name: "Unisex",
      image: "/perfume1.png?height=600&width=400",
    },
  ];
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

  const handleAddToCart = (id: string) => {
    const cartCookie = Cookies.get("cart");
    const currentCart = cartCookie ? JSON.parse(cartCookie) : [];

    if (!currentCart.includes(id)) {
      const updatedCart = [...currentCart, id];
      Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative h-[80vh] w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />
        <Image
          src="/perfume-bottle.jpg?height=1080&width=1920"
          alt="عطور عمران"
          fill
          priority
          className="object-cover"
        />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl font-bold text-white md:text-6xl"
          >
            Discover Your Signature Scent
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-4 max-w-2xl text-xl text-white md:text-2xl"
          >
            Explore our exclusive collection of Omran Perfumes
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8"
          >
            <Button asChild size="lg" className="text-lg">
              <Link href="/products">Shop Now</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Introduction Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-muted/30"
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-3xl font-bold md:text-4xl"
            >
              Who are we?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              At Omran Perfumes, we offer you a unique collection of luxurious
              perfumes crafted with utmost care from the finest natural
              ingredients. Our fragrances blend traditional Arabian essence with
              modern global elegance to provide you with an unforgettable
              olfactory experience.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-8"
            >
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Read More About Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="py-16"
      >
        <div className="container">
          <h2 className="text-3xl font-bold text-center md:text-4xl">
            Featured Products
          </h2>

          {loading ? (
            <div className="mt-12 flex justify-center">
              <span className="mr-2">Loading products...</span>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="mt-8 rounded-lg border border-destructive bg-destructive/10 p-4 text-center text-destructive">
              {error}
            </div>
          ) : featuredProducts.length === 0 ? (
            <p className="mt-8 text-center text-muted-foreground">
              There are no products currently available.
            </p>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-all hover:shadow-lg"
                >
                  {product.isNew && (
                    <Badge className="absolute right-4 top-4 z-10">New</Badge>
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
                      // src={product.image || "/placeholder.svg"}
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
                            {product.price} EGP
                          </span>
                          <span className="text-lg font-bold text-destructive">
                            {product.discountedPrice} EGP
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">
                          {product.price} EGP
                        </span>
                      )}
                    </div>

                    {product.offer && (
                      <div className="mt-3 flex items-center justify-center gap-2 rounded-md bg-primary/10 p-2 text-sm">
                        <Tag className="h-4 w-4 text-primary" />
                        <span>{product.offer}</span>
                      </div>
                    )}

                    <Button
                      asChild
                      onClick={() => {
                        handleAddToCart(product.id);
                      }}
                      className="mt-4 w-full"
                    >
                      <div>
                        <ShoppingBag className="h-5 w-5" />
                        Add to Cart
                      </div>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">View All</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Collections */}
      <section className="container">
        <h2 className="text-3xl font-bold mb-8">Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/products?collection=${collection.id}`}
            >
              <div className="relative overflow-hidden rounded-lg h-[400px] group">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {collection.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="py-16 bg-muted/30"
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Customer Reviews</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover what our valued customers say about their experience with
              Omran Perfumes
            </p>
          </div>
          <div className="mt-12">
            <ReviewsCarousel />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/reviews">View All Reviews</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className=" py-16 text-primary-foreground"
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-white">
              Contact us
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We are happy to answer your inquiries and fulfill your requests.
              Contact us via social media or through the contact form.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild variant="secondary" size="lg">
                <Link
                  href="https://wa.me/+201030576522"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="ml-2 h-5 w-5" />
                  What's
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link
                  href="https://www.instagram.com/omranperfumes/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="ml-2 h-5 w-5" />
                  Instagram
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link
                  href="https://www.facebook.com/share/1AKQYzt5cL/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="ml-2 h-5 w-5" />
                  Facebook
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
