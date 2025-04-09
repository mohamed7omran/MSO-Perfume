"use client";
import { useRouter } from "next/navigation";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useEffect, useState } from "react";

const OrderDetailsPage = ({ orderDetails, orderId }) => {
  const router = useRouter();

  //   useEffect(() => {
  //     const fetchOrderDetails = async () => {
  //       if (!orderId) return;

  //       const orderDoc = await getDoc(doc(db, "orders", orderId as string));
  //       if (orderDoc.exists()) {
  //         setOrderDetails(orderDoc.data());
  //       } else {
  //         console.log("طلب غير موجود");
  //       }
  //     };

  //     fetchOrderDetails();
  //   }, [orderId]);

  return (
    <div className="p-6">
      {orderDetails ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">تفاصيل الطلب</h1>
          <div>
            <h2 className="text-xl font-semibold">معلومات العميل:</h2>
            <p>
              الاسم: {orderDetails.customer.firstName}{" "}
              {orderDetails.customer.lastName}
            </p>
            <p>الهاتف: {orderDetails.customer.phone}</p>
            <p>
              العنوان: {orderDetails.customer.address},{" "}
              {orderDetails.customer.city}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">المنتجات:</h2>
            <ul>
              {orderDetails.cartItems.map((item: any, index: number) => (
                <li key={index} className="mb-2">
                  <p>
                    {item.name} - السعر: {item.discountedPrice} ×{" "}
                    {item.quantity}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p>الإجمالي: {orderDetails.total} جنيه</p>
            <p>الحالة: {orderDetails.status}</p>
            <p>تاريخ الطلب: {orderDetails.createdAt}</p>
          </div>
        </div>
      ) : (
        <p>تحميل التفاصيل...</p>
      )}
    </div>
  );
};

export default OrderDetailsPage;
