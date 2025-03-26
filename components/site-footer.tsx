import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-muted py-12 mt-auto">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">MSO Perfume</h3>
          <p className="text-muted-foreground">
            Exquisite fragrances crafted with the finest ingredients for the discerning individual.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/shop?category=men" className="text-muted-foreground hover:text-foreground transition-colors">
                Men's Fragrances
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=women"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Women's Fragrances
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=unisex"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Unisex Fragrances
              </Link>
            </li>
            <li>
              <Link
                href="/shop?category=gift-sets"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Gift Sets
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <p className="text-center text-muted-foreground">
          © {new Date().getFullYear()} MSO Perfume. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

