import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, Home } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center font-bold">
            <span className="text-lg">لوحة الإدارة</span>
          </div>
          <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="flex-1 md:flex-initial">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <Home className="ml-2 h-4 w-4" />
                  العودة للموقع
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -mr-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-l md:sticky md:block">
          <div className="py-6 pl-8 pr-6">
            <nav className="flex flex-col space-y-2">
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin">
                  <LayoutDashboard className="ml-2 h-4 w-4" />
                  لوحة التحكم
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/products">
                  <Package className="ml-2 h-4 w-4" />
                  المنتجات
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/orders">
                  <Package className="ml-2 h-4 w-4" />
                  الطلبات
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/admin/notifications">
                  <Package className="ml-2 h-4 w-4" />
                  الاشعارات
                </Link>
              </Button>
            </nav>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
