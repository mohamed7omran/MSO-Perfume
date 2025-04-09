import EditProduct from "@/components/EditProduct";
import { getProducts, getProductById } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id); // جلب بيانات المنتج باستخدام الـ id

  return <EditProduct product={product} id={params.id} />; // تمرير البيانات إلى EditProduct
}
