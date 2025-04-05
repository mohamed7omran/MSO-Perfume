import Link from "next/link";
import { Instagram, Facebook, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="text-center md:text-right">
          <p className="text-lg font-bold">عطور عمران</p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://wa.me/+201030576522"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="WhatsApp"
          >
            <MessageSquare className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/omranperfumes/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.facebook.com/share/g/18vuasFY4m/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
