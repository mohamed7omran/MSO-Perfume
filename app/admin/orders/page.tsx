"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
type Order = {
  id: string;
  cartItems: {
    name: string;
    discountedPrice: number;
    quantity: number;
  }[];
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
  };
  total: number;
  status: "pending" | "delivered" | "canceled";
  createdAt: string;
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [filter, setFilter] = useState<
    "all" | "pending" | "delivered" | "canceled"
  >("all");

  const [minTotal, setMinTotal] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const data: Order[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    if (filter !== "all") {
      filtered = filtered.filter((order) => order.status === filter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customer.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.customer.phone.includes(searchQuery)
      );
    }

    // فلترة حسب التاريخ
    if (startDate && endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt.seconds * 1000);
        return (
          orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
        );
      });
    }

    // فلترة حسب الإجمالي
    if (minTotal > 0) {
      filtered = filtered.filter((order) => order.total >= minTotal);
    }

    // فلترة حسب المدينة
    if (selectedCity) {
      filtered = filtered.filter(
        (order) => order.customer.city === selectedCity
      );
    }

    return filtered;
  }, [filter, searchQuery, orders, startDate, endDate, minTotal, selectedCity]);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const exportToExcel = async () => {
    setLoading(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("الطلبات");

      sheet.addRow([
        "الاسم",
        "الهاتف",
        "الإيميل",
        "الإجمالي",
        "الحالة",
        "التاريخ",
      ]);

      currentOrders.forEach((order) => {
        sheet.addRow([
          order.customer.name,
          order.customer.phone,
          order.customer.email,
          `${order.total} جنيه`,
          order.status,
          order.createdAt,
        ]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "orders.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    const confirmDelete = window.confirm("⚠️ هل أنت متأكد من حذف هذا الطلب؟");

    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "orders", orderId));
      setOrders(orders.filter((order) => order.id !== orderId));
      toast.success("✅ تم حذف الطلب بنجاح"); // لو عندك toast
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("❌ فشل حذف الطلب!");
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    newStatus: "pending" | "delivered" | "canceled"
  ) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">📦 لوحة الطلبات</h1>

      {/* Filter + Export */}
      <div className="flex items-center gap-4 mb-6">
        <select
          className="border rounded px-3 py-1"
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as "all" | "pending" | "delivered" | "canceled"
            )
          }
        >
          <option value="all">كل الطلبات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="delivered">تم التوصيل</option>
          <option value="canceled">ملغاة</option>
        </select>

        <input
          type="text"
          className="border rounded px-3 py-1"
          placeholder="ابحث بالاسم أو الهاتف"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <input
          type="number"
          className="border rounded px-3 py-1"
          placeholder="الحد الأدنى للإجمالي"
          value={minTotal}
          onChange={(e) => setMinTotal(Number(e.target.value))}
        /> */}

        <input
          type="date"
          className="border rounded px-3 py-1"
          placeholder="من"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border rounded px-3 py-1"
          placeholder="إلى"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* <select
          className="border rounded px-3 py-1"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">اختر المدينة</option>
          <option value="Cairo">القاهرة</option>
          <option value="Alexandria">الإسكندرية</option>
          <option value="Giza">الجيزة</option>
          <option value="El-Tagamoa">التجمع</option>
        </select> */}

        <Button onClick={exportToExcel}>
          {" "}
          {loading ? "جاري التصدير..." : "⬇️ تصدير Excel"}
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full rounded shadow text-sm">
          <thead className="">
            <tr>
              <th className="text-right p-2">الاسم</th>
              <th className="text-right p-2">الهاتف</th>
              <th className="text-right p-2">الإيميل</th>
              <th className="text-right p-2">الإجمالي</th>
              <th className="text-right p-2">الحالة</th>
              <th className="text-right p-2">التاريخ</th>
              <th className="text-right p-2">تغير الحالة</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  لا يوجد طلبات حاليًا
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => {
                const formattedDate = new Date(
                  order.createdAt.seconds * 1000
                ).toLocaleString();
                return (
                  <tr
                    key={order.id}
                    className={`border-t ${
                      order.status == "canceled" && "line-through"
                    }`}
                  >
                    <td className="p-2">{order.customer.name}</td>
                    <td className="p-2">{order.customer.phone}</td>
                    <td className="p-2">{order.customer.email}</td>
                    <td className="p-2">{order.total} جنيه</td>
                    <td
                      className={`p-2 capitalize ${
                        order.status == "canceled" && "text-destructive"
                      } ${order.status == "delivered" && "text-primary"} ${
                        order.status == "pending" && ""
                      } `}
                    >
                      {order.status}
                    </td>
                    <td className="p-2">{formattedDate}</td>
                    <td className="p-2 flex gap-2">
                      {order.status !== "pending" && (
                        <Button
                          onClick={() => updateOrderStatus(order.id, "pending")}
                          className="bg-gray-500"
                        >
                          تراجع
                        </Button>
                      )}
                      {order.status !== "delivered" && (
                        <Button
                          onClick={() =>
                            updateOrderStatus(order.id, "delivered")
                          }
                        >
                          تم التوصيل
                        </Button>
                      )}
                      {order.status !== "canceled" && (
                        <Button
                          onClick={() =>
                            updateOrderStatus(order.id, "canceled")
                          }
                        >
                          ملغاة
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteOrder(order.id)}
                        className="bg-red-500"
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
