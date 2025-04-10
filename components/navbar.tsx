"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Divide, Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { theme } = useTheme();

  useEffect(() => {
    const cartCookie = Cookies.get("cart");
    const currentCart = cartCookie ? JSON.parse(cartCookie) : [];
    setCartCount(currentCart.length);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className=" text-primary">
            <Avatar className="h-14 w-14">
              <AvatarImage
                className="aspect-square h-16 w-20"
                src={theme === "dark" ? "/logo2.png" : "/logo.png"}
                alt="عطور عمران"
              />
              <AvatarFallback>عطور عمران</AvatarFallback>
            </Avatar>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 ml-7">
            <Link
              href="/"
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/reviews"
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              Reviews
            </Link>
            <Link
              href="/policy"
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              Policy
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center justify-center ">
          {/* <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 py-0.5">
                {cartCount}
              </span>
            )}
          </div> */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <div className="ml-5">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}

        <div className="md:hidden flex items-center justify-center">
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-3"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed  h-screen w-[70vw]  top-16 right-0  z-50 bg-background md:hidden",
          isMenuOpen ? "flex flex-col" : "hidden"
        )}
      >
        <nav className="flex  flex-col items-end gap-6 p-6">
          <Link
            href="/"
            className="text-xl  font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Divide className="h-[1px] w-full bg-muted" />
          <Link
            href="/products"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Divide className="h-[1px] w-full bg-muted" />
          <Link
            href="/reviews"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Reviews
          </Link>
          <Divide className="h-[1px] w-full bg-muted" />

          <Link
            href="/policy"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Policy
          </Link>
          <Divide className="h-[1px] w-full bg-muted" />
          <Link
            href="/about"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Divide className="h-[1px] w-full bg-muted" />

          <Link
            href="/contact"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
