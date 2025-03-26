"use client";

import { useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

// Define product type for better type safety
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  notes?: string[];
};

export default function ShopPage() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    categories: {
      men: false,
      women: false,
      unisex: false,
    },
    priceRanges: {
      under50: false,
      between50And100: false,
      between100And150: false,
      above150: false,
    },
    notes: {
      floral: false,
      woody: false,
      citrus: false,
      oriental: false,
      fresh: false,
    },
  });

  // Apply filters whenever filters or search term changes
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filters
    const categoryFiltersActive = Object.values(filters.categories).some(
      (value) => value
    );
    if (categoryFiltersActive) {
      result = result.filter((product) => {
        const categoryLower = product.category.toLowerCase();
        if (filters.categories.men && categoryLower === "men") return true;
        if (filters.categories.women && categoryLower === "women") return true;
        if (filters.categories.unisex && categoryLower === "unisex")
          return true;
        return !categoryFiltersActive; // Keep all if no filters active
      });
    }

    // Apply price range filters
    const priceFiltersActive = Object.values(filters.priceRanges).some(
      (value) => value
    );
    if (priceFiltersActive) {
      result = result.filter((product) => {
        if (filters.priceRanges.under50 && product.price < 50) return true;
        if (
          filters.priceRanges.between50And100 &&
          product.price >= 50 &&
          product.price <= 100
        )
          return true;
        if (
          filters.priceRanges.between100And150 &&
          product.price > 100 &&
          product.price <= 150
        )
          return true;
        if (filters.priceRanges.above150 && product.price > 150) return true;
        return !priceFiltersActive; // Keep all if no filters active
      });
    }

    // Apply notes filters
    const notesFiltersActive = Object.values(filters.notes).some(
      (value) => value
    );
    if (notesFiltersActive && result.length > 0) {
      result = result.filter((product) => {
        if (!product.notes) return !notesFiltersActive;

        if (filters.notes.floral && product.notes.includes("floral"))
          return true;
        if (filters.notes.woody && product.notes.includes("woody")) return true;
        if (filters.notes.citrus && product.notes.includes("citrus"))
          return true;
        if (filters.notes.oriental && product.notes.includes("oriental"))
          return true;
        if (filters.notes.fresh && product.notes.includes("fresh")) return true;

        return !notesFiltersActive; // Keep all if no filters active
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          // featured - keep original order
          return 0;
      }
    });

    setFilteredProducts(result);
  }, [filters, searchTerm, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "50ml", // Default size
      category: product.category,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleFilterChange = (
    category: string,
    key: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: checked,
      },
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Shop All Fragrances</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-4">Category</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="men"
                  checked={filters.categories.men}
                  onCheckedChange={(checked) =>
                    handleFilterChange("categories", "men", checked as boolean)
                  }
                />
                <Label htmlFor="men">Men</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="women"
                  checked={filters.categories.women}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "categories",
                      "women",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="women">Women</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="unisex"
                  checked={filters.categories.unisex}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "categories",
                      "unisex",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="unisex">Unisex</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-1"
                  checked={filters.priceRanges.under50}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "priceRanges",
                      "under50",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="price-1">Under $50</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-2"
                  checked={filters.priceRanges.between50And100}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "priceRanges",
                      "between50And100",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="price-2">$50 - $100</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-3"
                  checked={filters.priceRanges.between100And150}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "priceRanges",
                      "between100And150",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="price-3">$100 - $150</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="price-4"
                  checked={filters.priceRanges.above150}
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "priceRanges",
                      "above150",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="price-4">$150+</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Fragrance Notes</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="floral"
                  checked={filters.notes.floral}
                  onCheckedChange={(checked) =>
                    handleFilterChange("notes", "floral", checked as boolean)
                  }
                />
                <Label htmlFor="floral">Floral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="woody"
                  checked={filters.notes.woody}
                  onCheckedChange={(checked) =>
                    handleFilterChange("notes", "woody", checked as boolean)
                  }
                />
                <Label htmlFor="woody">Woody</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="citrus"
                  checked={filters.notes.citrus}
                  onCheckedChange={(checked) =>
                    handleFilterChange("notes", "citrus", checked as boolean)
                  }
                />
                <Label htmlFor="citrus">Citrus</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="oriental"
                  checked={filters.notes.oriental}
                  onCheckedChange={(checked) =>
                    handleFilterChange("notes", "oriental", checked as boolean)
                  }
                />
                <Label htmlFor="oriental">Oriental</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fresh"
                  checked={filters.notes.fresh}
                  onCheckedChange={(checked) =>
                    handleFilterChange("notes", "fresh", checked as boolean)
                  }
                />
                <Label htmlFor="fresh">Fresh</Label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search fragrances..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select
                defaultValue="featured"
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down your fragrance search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <h3 className="font-medium mb-4">Category</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="men-mobile"
                            checked={filters.categories.men}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "categories",
                                "men",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="men-mobile">Men</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="women-mobile"
                            checked={filters.categories.women}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "categories",
                                "women",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="women-mobile">Women</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="unisex-mobile"
                            checked={filters.categories.unisex}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "categories",
                                "unisex",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="unisex-mobile">Unisex</Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-4">Price Range</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="price-1-mobile"
                            checked={filters.priceRanges.under50}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "priceRanges",
                                "under50",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="price-1-mobile">Under $50</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="price-2-mobile"
                            checked={filters.priceRanges.between50And100}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "priceRanges",
                                "between50And100",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="price-2-mobile">$50 - $100</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="price-3-mobile"
                            checked={filters.priceRanges.between100And150}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "priceRanges",
                                "between100And150",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="price-3-mobile">$100 - $150</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="price-4-mobile"
                            checked={filters.priceRanges.above150}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "priceRanges",
                                "above150",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="price-4-mobile">$150+</Label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-4">Fragrance Notes</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="floral-mobile"
                            checked={filters.notes.floral}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "notes",
                                "floral",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="floral-mobile">Floral</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="woody-mobile"
                            checked={filters.notes.woody}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "notes",
                                "woody",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="woody-mobile">Woody</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="citrus-mobile"
                            checked={filters.notes.citrus}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "notes",
                                "citrus",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="citrus-mobile">Citrus</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="oriental-mobile"
                            checked={filters.notes.oriental}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "notes",
                                "oriental",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="oriental-mobile">Oriental</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="fresh-mobile"
                            checked={filters.notes.fresh}
                            onCheckedChange={(checked) =>
                              handleFilterChange(
                                "notes",
                                "fresh",
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor="fresh-mobile">Fresh</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium mb-4">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search term.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    categories: { men: false, women: false, unisex: false },
                    priceRanges: {
                      under50: false,
                      between50And100: false,
                      between100And150: false,
                      above150: false,
                    },
                    notes: {
                      floral: false,
                      woody: false,
                      citrus: false,
                      oriental: false,
                      fresh: false,
                    },
                  });
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
                      <h3 className="font-medium text-lg mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/shop/${product.id}`}>View Details</Link>
                    </Button>
                    <Button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination - only show if we have products */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  className="bg-primary text-primary-foreground"
                >
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sample product data with real images and notes
const products: Product[] = [
  {
    id: "1",
    name: "Midnight Orchid",
    category: "Women",
    price: 129.99,
    image: "/1.jpg",
    notes: ["floral", "oriental"],
  },
  {
    id: "2",
    name: "Ocean Breeze",
    category: "Men",
    price: 99.99,
    image: "/2.jpg",
    notes: ["fresh", "citrus"],
  },
  {
    id: "3",
    name: "Amber Elegance",
    category: "Unisex",
    price: 149.99,
    image: "/3.jpg",
    notes: ["woody", "oriental"],
  },
  {
    id: "4",
    name: "Velvet Rose",
    category: "Women",
    price: 119.99,
    image: "/4.jpg",
    notes: ["floral", "fresh"],
  },
  {
    id: "5",
    name: "Cedar Noir",
    category: "Men",
    price: 89.99,
    image: "/5.jpg",
    notes: ["woody"],
  },
  {
    id: "6",
    name: "Golden Citrus",
    category: "Unisex",
    price: 109.99,
    image: "/6.jpg",
    notes: ["citrus", "fresh"],
  },
  {
    id: "7",
    name: "Lavender Dreams",
    category: "Women",
    price: 79.99,
    image: "/7.jpg",
    notes: ["floral", "fresh"],
  },
  {
    id: "8",
    name: "Spiced Leather",
    category: "Men",
    price: 139.99,
    image: "/3.jpg",
    notes: ["woody", "oriental"],
  },
  {
    id: "9",
    name: "Vanilla Musk",
    category: "Unisex",
    price: 99.99,
    image: "/8.jpg",
    notes: ["oriental"],
  },
];
