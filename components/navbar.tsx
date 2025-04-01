"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { theme } = useTheme();

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
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            الرئيسية
          </Link>
          <Link
            href="/products"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            منتجاتنا
          </Link>
          <Link
            href="/reviews"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            التقييمات
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            من نحن؟
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            تواصل معنا
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
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

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed w-full  top-16 left-0 rounded-md z-50 bg-background md:hidden",
          isMenuOpen ? "flex flex-col" : "hidden"
        )}
      >
        <nav className="flex  flex-col items-center gap-6 p-6">
          <Link
            href="/"
            className="text-xl  font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            الرئيسية
          </Link>
          <Link
            href="/products"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            منتجاتنا
          </Link>
          <Link
            href="/reviews"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            التقييمات
          </Link>
          <Link
            href="/about"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            من نحن؟
          </Link>
          <Link
            href="/contact"
            className="text-xl font-medium transition-colors hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            تواصل معنا
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
