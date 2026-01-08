"use client"
import { useState, useEffect } from "react";
import Toast from "@/components/admin/OrdersToast";

type Order = {
  id: number;
  customer: string;
  status: "جدید" | "در حال پردازش" | "تکمیل شده" | "لغو شده";
  total: number;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  // 🟢 دریافت سفارش‌ها از API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders"); // تغییر به مسیر واقعی API
      if (!res.ok) throw new Error("خطا در دریافت سفارش‌ها");
      const data: Order[] = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setToast({ message: "خطا در دریافت سفارش‌ها", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🟢 ثبت تغییرات سفارش (PUT)
  const updateOrder = async (order: Order) => {
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error("خطا در بروزرسانی سفارش");
      setToast({
        message: `سفارش ${order.id} با موفقیت ثبت شد`,
        type: "success",
      });
      // اختیاری: بروزرسانی مجدد از سرور
      fetchOrders();
    } catch (err) {
      console.error(err);
      setToast({ message: "خطا در ثبت سفارش", type: "error" });
    }
  };

  // 🟢 حذف سفارش (DELETE)
  const deleteOrder = async (id: number) => {
    if (!confirm("آیا مطمئن هستید می‌خواهید این سفارش را حذف کنید؟")) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("خطا در حذف سفارش");
      setToast({ message: "سفارش با موفقیت حذف شد", type: "warning" });
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      console.error(err);
      setToast({ message: "خطا در حذف سفارش", type: "error" });
    }
  };

  // تغییر وضعیت locally قبل از ثبت
  const handleStatusChange = (id: number, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">سفارشات</h1>

      {loading ? (
        <p>در حال بارگذاری سفارش‌ها...</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">نام مشتری</th>
              <th className="text-left p-3">وضعیت</th>
              <th className="text-left p-3">مبلغ کل</th>
              <th className="text-left p-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order.id,
                        e.target.value as Order["status"]
                      )
                    }
                    className="border rounded p-1"
                  >
                    <option>جدید</option>
                    <option>در حال پردازش</option>
                    <option>تکمیل شده</option>
                    <option>لغو شده</option>
                  </select>
                </td>
                <td className="p-3">{order.total.toLocaleString()} تومان</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => updateOrder(order)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    ثبت
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
