"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [ordersCount, setOrdersCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const orderSnapshot = await getDocs(collection(db, "orders"));
      setOrdersCount(orderSnapshot.size);

      const customerSnapshot = await getDocs(collection(db, "customers"));
      setCustomersCount(customerSnapshot.size);
    };

    fetchData();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 لوحة التحكم</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h2 className="text-xl">عدد الطلبات</h2>
          <p className="text-2xl font-bold">{ordersCount}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded shadow">
          <h2 className="text-xl">عدد العملاء</h2>
          <p className="text-2xl font-bold">{customersCount}</p>
        </div>
      </div>
    </div>
  );
}

function ArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
