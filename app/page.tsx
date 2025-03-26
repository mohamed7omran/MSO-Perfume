import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="/3.jpg"
          alt="Luxury Perfume Collection"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Signature Scent
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Exquisite fragrances crafted with the finest ingredients for the
            discerning individual
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
      <div className="bg-background text-foreground p-6">
        هذا عنصر يختبر الألوان!
      </div>
      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Collections
        </h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {featuredPerfumes.map((perfume) => (
              <CarouselItem
                key={perfume.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border-none shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={perfume.image || "/placeholder.png"}
                        alt={perfume.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg">{perfume.name}</h3>
                      <div className="flex items-center mt-1 mb-2">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < perfume.rating
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">${perfume.price}</span>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/shop/${perfume.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-1/2" />
          <CarouselNext className="right-0 translate-x-1/2" />
        </Carousel>
      </section>

      {/* Why MSO Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why MSO Perfume?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">
                Premium Ingredients
              </h3>
              <p>
                Our fragrances are crafted using only the finest ingredients
                sourced from around the world.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Master Perfumers</h3>
              <p>
                Each scent is created by master perfumers with decades of
                experience in the art of fragrance creation.
              </p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">
                Long-Lasting Scents
              </h3>
              <p>
                Our unique formulation ensures that your fragrance lasts
                throughout the day and into the night.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                </div>
                <p className="italic mb-4">{`"${testimonial.comment}"`}</p>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={testimonial.avatar || "/default-avatar.webp"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Find Your Perfect Scent?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our collection of premium fragrances and discover the one
            that speaks to you.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8"
          >
            <Link href="/shop" className="flex items-center">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
// Sample data
const featuredPerfumes = [
  {
    id: "1",
    name: "Midnight Orchid",
    price: 129.99,
    rating: 5,
    image: "/2.jpg?height=500&width=500",
  },
  {
    id: "2",
    name: "Ocean Breeze",
    price: 99.99,
    rating: 4,
    image: "/1.jpg?height=500&width=500",
  },
  {
    id: "3",
    name: "Amber Elegance",
    price: 149.99,
    rating: 5,
    image: "/4.jpg?height=500&width=500",
  },
  {
    id: "4",
    name: "Velvet Rose",
    price: 119.99,
    rating: 4,
    image: "/6.jpg?height=500&width=500",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York",
    rating: 5,
    comment:
      "The Midnight Orchid fragrance is absolutely divine! I receive compliments every time I wear it.",
    avatar: "/default-avatar.webp?height=100&width=100",
  },
  {
    name: "Michael Chen",
    location: "Los Angeles",
    rating: 5,
    comment:
      "Ocean Breeze has become my signature scent. It's fresh yet sophisticated, perfect for any occasion.",
    avatar: "/default-avatar.webp?height=100&width=100",
  },
  {
    name: "Emma Rodriguez",
    location: "Miami",
    rating: 4,
    comment:
      "Amber Elegance is the perfect evening fragrance. Long-lasting and truly unique.",
    avatar: "/default-avatar.webp?height=100&width=100",
  },
];
