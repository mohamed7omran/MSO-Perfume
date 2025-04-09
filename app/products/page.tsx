"use client";

import dynamic from "next/dynamic";

const ProductsPage = dynamic(() => import("@/components/productsPage"), {
  ssr: false,
});

export default function Page() {
  return <ProductsPage />;
}
