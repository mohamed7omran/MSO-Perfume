// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import OrderDetails from "@/components/orderDetails";

// export async function generateStaticParams() {
//   const querySnapshot = await getDocs(collection(db, "orders"));
//   const orders = querySnapshot.docs.map((doc) => ({
//     id: doc.id.toString(),
//   }));

//   return orders.map((order) => ({
//     params: order,
//   }));
// }

// export default async function OrderDetailsPage({
//   params,
// }: {
//   params: { orderId: string };
// }) {
//   const orderDoc = await getDoc(doc(db, "orders", params.orderId));
//   const orderDetails = orderDoc.exists() ? orderDoc.data() : null;

//   if (!orderDetails) {
//     return <div>الطلب غير موجود</div>;
//   }

//   return <OrderDetails order={orderDetails} orderId={params.orderId} />;
// }
