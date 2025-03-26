"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

// Define product type for better type safety
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  notes: {
    top: string;
    middle: string;
    base: string;
  };
  reviewsList: {
    name: string;
    rating: number;
    comment: string;
  }[];
};

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  // In a real app, you would fetch the product data based on the productId
  const product =
    products.find((p) => p.id === params.productId) || products[0];
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link
        href="/shop"
        className="flex items-center text-muted-foreground mb-8 hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square relative rounded-md overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} view ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-2 text-sm text-muted-foreground">
            {product.category}
          </div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= product.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold mb-6">
            ${product.price.toFixed(2)}
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label htmlFor="size" className="block text-sm font-medium mb-2">
                Size
              </label>
              <Select
                defaultValue="50ml"
                value={selectedSize}
                onValueChange={setSelectedSize}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30ml">30ml</SelectItem>
                  <SelectItem value="50ml">50ml</SelectItem>
                  <SelectItem value="100ml">100ml</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-2"
              >
                Quantity
              </label>
              <Select
                defaultValue="1"
                value={quantity.toString()}
                onValueChange={(value) => setQuantity(Number.parseInt(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="flex-1" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="notes">Fragrance Notes</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="notes" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Top Notes</h3>
                  <p className="text-muted-foreground">{product.notes.top}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Middle Notes</h3>
                  <p className="text-muted-foreground">
                    {product.notes.middle}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Base Notes</h3>
                  <p className="text-muted-foreground">{product.notes.base}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-6">
                {product.reviewsList.map((review, index) => (
                  <div key={index} className="pb-4 border-b last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "fill-primary text-primary"
                                : "fill-muted text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.name}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <Link href={`/shop/${product.id}`} className="block">
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  {product.category}
                </div>
                <Link href={`/shop/${product.id}`} className="block">
                  <h3 className="font-medium mb-2">{product.name}</h3>
                </Link>
                <p className="font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sample product data with real images
const products: Product[] = [
  {
    id: "1",
    name: "Midnight Orchid",
    category: "Women",
    price: 129.99,
    rating: 5,
    reviews: 24,
    image: "/8.jpg",
    description:
      "Midnight Orchid is a captivating fragrance that embodies elegance and mystery. This exquisite perfume opens with vibrant top notes of bergamot and black currant, leading to a heart of rare orchid and jasmine. The base notes of vanilla, patchouli, and amber create a lasting impression that lingers throughout the day and into the night.",
    notes: {
      top: "Bergamot, Black Currant, Pink Pepper",
      middle: "Orchid, Jasmine, Rose",
      base: "Vanilla, Patchouli, Amber, Musk",
    },
    reviewsList: [
      {
        name: "Sarah J.",
        rating: 5,
        comment:
          "This perfume is absolutely divine! I receive compliments every time I wear it. The scent lasts all day and evolves beautifully.",
      },
      {
        name: "Emma R.",
        rating: 4,
        comment:
          "Lovely fragrance with great staying power. The orchid notes really shine through. Would definitely recommend!",
      },
      {
        name: "Michelle T.",
        rating: 5,
        comment:
          "My new signature scent! Elegant, sophisticated, and not overwhelming. Perfect for both day and evening wear.",
      },
    ],
  },
  {
    id: "2",
    name: "Ocean Breeze",
    category: "Men",
    price: 99.99,
    rating: 4,
    reviews: 18,
    image: "/9.jpg",
    description:
      "Ocean Breeze captures the essence of a fresh coastal morning. This invigorating fragrance combines crisp sea notes with aromatic herbs and woods, creating a clean, masculine scent that's perfect for the modern man. Ideal for daily wear, this scent provides a refreshing confidence that lasts throughout the day.",
    notes: {
      top: "Sea Notes, Bergamot, Lemon",
      middle: "Lavender, Rosemary, Geranium",
      base: "Cedar, Amber, Musk",
    },
    reviewsList: [
      {
        name: "Michael C.",
        rating: 5,
        comment:
          "Ocean Breeze has become my signature scent. It's fresh yet sophisticated, perfect for any occasion.",
      },
      {
        name: "David L.",
        rating: 4,
        comment:
          "Great everyday fragrance. Not too overpowering but lasts well throughout the day.",
      },
      {
        name: "James B.",
        rating: 4,
        comment:
          "Clean, fresh, and masculine. Gets lots of compliments at the office.",
      },
    ],
  },
  {
    id: "3",
    name: "Amber Elegance",
    category: "Unisex",
    price: 149.99,
    rating: 5,
    reviews: 22,
    image: "/10.jpg",
    description:
      "Amber Elegance is a sophisticated blend of warm amber and exotic spices. This luxurious fragrance creates an aura of refined elegance with its rich, deep notes. The perfect choice for those who appreciate timeless sophistication and subtle complexity.",
    notes: {
      top: "Cardamom, Cinnamon, Bergamot",
      middle: "Amber, Vanilla, Sandalwood",
      base: "Musk, Patchouli, Vetiver",
    },
    reviewsList: [
      {
        name: "Alex P.",
        rating: 5,
        comment:
          "This fragrance is absolutely stunning. Rich, warm, and long-lasting without being overwhelming.",
      },
      {
        name: "Jordan K.",
        rating: 5,
        comment:
          "Perfect for evening wear. The amber notes are beautifully balanced with the spices.",
      },
      {
        name: "Taylor M.",
        rating: 4,
        comment:
          "Elegant and sophisticated. I wear it for special occasions and always receive compliments.",
      },
    ],
  },
  // Additional products would be defined here
];

const recommendedProducts = [
  {
    id: "3",
    name: "Amber Elegance",
    category: "Unisex",
    price: 149.99,
    image: "/4.jpg",
  },
  {
    id: "4",
    name: "Velvet Rose",
    category: "Women",
    price: 119.99,
    image: "/12.jpg",
  },
  {
    id: "5",
    name: "Cedar Noir",
    category: "Men",
    price: 89.99,
    image: "/13.jpg",
  },
  {
    id: "6",
    name: "Golden Citrus",
    category: "Unisex",
    price: 109.99,
    image: "/10.jpg",
  },
];
