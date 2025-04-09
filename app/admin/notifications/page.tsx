"use client";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useEffect, useState } from "react";

const RealTimeNotifications = () => {
  const [newOrders, setNewOrders] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewOrders(orders);
    });

    // cleanup when unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-30 right-0 p-4">
      {newOrders.length > 0 && (
        <div className="bg-green-500 text-white p-3 rounded-md shadow-md">
          <p>طلب جديد وصل!</p>
          <p>{newOrders.length} طلبات جديدة</p>
        </div>
      )}
    </div>
  );
};

export default RealTimeNotifications;
