import EditProduct from "@/components/EditProduct";
import { getProducts, getProductById } from "@/lib/products";

// تعريف generateStaticParams لجلب مسارات الـ id الثابتة
export async function generateStaticParams() {
  const products = await getProducts();

  // بناء مسارات المنتجات باستخدام الـ id
  return products.map((product) => ({
    id: product.id.toString(), // تحويل الـ id إلى string
  }));
}

// المكون الرئيسي لصفحة تحرير المنتج
export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id); // جلب بيانات المنتج باستخدام الـ id

  return <EditProduct product={product} id={params.id} />; // تمرير البيانات إلى EditProduct
}
