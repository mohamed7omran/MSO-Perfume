"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Loader2,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Cookies from "js-cookie";
import { getProductById } from "@/lib/products";
import { Label } from "@/components/ui/label";
import { MenubarRadioGroup } from "@/components/ui/menubar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type CartItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  notes: string;
  discountedPrice: number;
  offer: string;
  isNew: boolean;
  price: number;
  quantity: number;
};
export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    const cartCookie = Cookies.get("cart");
    const cartIds: string[] = cartCookie ? JSON.parse(cartCookie) : [];

    async function fetchCartItems() {
      setLoading(true);
      const items: CartItem[] = [];
      for (const id of cartIds) {
        const product = await getProductById(id);
        if (product) {
          items.push({ ...product, quantity: 1 });
        }
      }
      setCartItems(items);
      setLoading(false);
    }

    if (cartIds.length > 0) {
      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    const cartCookie = Cookies.get("cart");
    const cartIds: string[] = cartCookie ? JSON.parse(cartCookie) : [];
    const updatedIds = cartIds.filter((cartId) => cartId !== id);
    Cookies.set("cart", JSON.stringify(updatedIds), { expires: 7 });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const shipping = 50.0;
  const total = subtotal + shipping;

  if (loading)
    return (
      <div className="mt-12 flex justify-center">
        <span className="mr-2">Loading products...</span>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  const handleSendWhatsApp = () => {
    if (cartItems.length === 0) return;

    let message = "🧴 طلب جديد من الموقع:\n\n📦 المنتجات:\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - السعر: ${
        item.discountedPrice
      } جنيه\n`;
    });

    message += "\n📍 تفاصيل الشحن:\n";
    message += `الاسم: ${formData.firstName} ${formData.lastName}\n`;
    message += `الإيميل: ${formData.email}\n`;
    message += `رقم الهاتف: ${formData.phone}\n`;
    message += `العنوان: ${formData.address}, ${formData.city}`;

    const encoded = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/+201030576522?text=${encoded}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {!isCheckOut && <h1 className="text-3xl font-bold mb-8">Your Cart</h1>}

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any perfumes to your cart yet.
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          {isCheckOut && (
            <>
              <Link
                href="/cart"
                onClick={() => setIsCheckOut(false)}
                className="flex items-center text-muted-foreground mb-8 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Cart
              </Link>
              <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            </>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {!isCheckOut && (
              <div className="lg:col-span-2">
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="relative w-20 h-20 rounded-md overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.discountedPrice.toFixed(2)} EGP
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.id,
                                    Number.parseInt(e.target.value) || 1
                                  )
                                }
                                className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {(item.discountedPrice * item.quantity).toFixed(
                                2
                              )}{" "}
                              EGP
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Remove item</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <Button variant="outline" asChild>
                    <Link href="/products" className="flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {isCheckOut && (
              <div className="lg:col-span-2 space-y-8">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>
                      Enter your shipping details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter your street address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={"cash"} className="space-y-4">
                      <div className="flex items-center space-x-2 rounded-md border p-4 cursor-not-allowed">
                        <RadioGroupItem disabled value="card" id="card" />
                        <Label
                          htmlFor="card"
                          className="flex items-center cursor-not-allowed text-muted-foreground"
                        >
                          <CreditCard className="mr-2 h-5 w-5" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border p-4">
                        <RadioGroupItem defaultChecked value="cash" id="cash" />
                        <Label htmlFor="cash">Cash on Delivery</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>
            )}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span> {subtotal.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span> {shipping.toFixed(2)} EGP</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span> {total.toFixed(2)} EGP</span>
                  </div>
                </CardContent>
                <CardFooter>
                  {isCheckOut ? (
                    <Button
                      onClick={handleSendWhatsApp}
                      className="w-full"
                      size="lg"
                    >
                      {/* <Link href="https://wa.me/+201030576522" target="_blank"> */}
                      Place Order
                      {/* </Link> */}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsCheckOut(true)}
                      className="w-full"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {!isCheckOut && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Have a Promo Code?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" />
                      <Button
                        onClick={() => alert("The code is not applied")}
                        variant="outline"
                      >
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
