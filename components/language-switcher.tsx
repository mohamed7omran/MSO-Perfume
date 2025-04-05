"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Locale, i18n } from "@/multilingual/i18n";

export default function LanguageSwitcher({
  currentLang,
  pathName,
}: {
  currentLang: Locale;
  pathName: string;
}) {
  const [open, setOpen] = useState(false);

  const languageNames = {
    en: "English",
    ar: "العربية",
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem key={locale} asChild>
            <Link
              href={`/${locale}${pathName}`}
              className={currentLang === locale ? "font-bold" : ""}
              onClick={() => setOpen(false)}
            >
              {languageNames[locale]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
