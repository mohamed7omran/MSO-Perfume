import Link from "next/link";
import { Instagram, Facebook, MessageSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function Footer() {
  const footerLinks = [
    { name: "about", href: `/about` },
    { name: "policy", href: `/policy` },
    { name: "contact", href: `/contact` },
  ];

  return (
    <footer className="border-t bg-primary">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Omran Perfumes</h3>
            <p className="text-sm text-muted-foreground">
              "Discover the finest collection of luxury perfumes from around the
              world."
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://wa.me/+201030576522"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="https://www.instagram.com/omranperfumes/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="https://www.facebook.com/share/1AKQYzt5cL/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground text-white">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
}
