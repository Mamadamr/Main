"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// ---------------- CSRF Helper ----------------
function getCookie(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  if (!cookie) return null;
  return decodeURIComponent(cookie.split("=")[1]);
}

async function csrfToken() {
  let token = getCookie("XSRF-TOKEN");
  if (!token) {
    await fetch("http://localhost:9000/sanctum/csrf-cookie", {
      credentials: "include",
    });
    token = getCookie("XSRF-TOKEN");
  }
  return token;
}

// ---------------- Fetch Admin Data ----------------
async function fetchAdminData(currentUser: any) {
  try {
    const xsrfToken = await csrfToken();
    if (!xsrfToken) throw new Error("CSRF token not found");

    const res = await fetch("http://localhost:9000/api/admin-info", {
      method: "POST", // ⚡ POST تا currentUser ارسال شود
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": xsrfToken,
      },
      body: JSON.stringify({
        email: currentUser?.email,
        id: currentUser?.id,
      }),
    });

    if (!res.ok) throw new Error("خطا در دریافت اطلاعات ادمین");

    return res.json();
  } catch (err: any) {
    toast.error(err.message || "خطا در دریافت ادمین");
    return null;
  }
}

// ---------------- فرم ایجاد سفارش ----------------
type OrderForm = {
  [x: string]: SetStateAction<number | null>;
  customer_name: string;
  website_url: string;
  pages_count: number;
  total_price: number;
  payment_type: string;
  status: string;
};



export default function CreateOrderForm({ currentUser }: { currentUser: any }) {
  // ----------------------------------get orders---------------
  async function loadOrders() {
    try {
      setOrdersLoading(true);
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");

      const res = await fetch("http://localhost:9000/api/orders", {
        method: "GET",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": xsrfToken!,
        },
      });

      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      toast.error("خطا در دریافت سفارش‌ها");
    } finally {
      setOrdersLoading(false);
    }
  }
  // ------------------delete orders------------
  async function confirmDeleteOrder() {
    if (!deleteOrderId) return;

    setDeleteLoading(true);

    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");

      const res = await fetch(
        `http://localhost:9000/api/orders/${deleteOrderId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "X-XSRF-TOKEN": xsrfToken!,
          },
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "خطا در حذف سفارش");
      }

      toast.success("سفارش با موفقیت حذف شد");
      setDeleteOrderId(null);
      loadOrders();
    } catch (err: any) {
      toast.error(err.message || "خطا در سرور");
    } finally {
      setDeleteLoading(false);
    }
  }

  // -----------------------
  const [form, setForm] = useState<OrderForm>({
    customer_name: "",
    website_url: "",
    pages_count: 1,
    total_price: 0,
    payment_type: "no_gateway",
    status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderForm[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


  useEffect(() => {
    if (currentUser?.id) {
      setForm((prev) => ({ ...prev, user_id: currentUser.id }));
    }
  }, [currentUser]);

  // ⚡ نمونه استفاده از fetchAdminData قبل ثبت سفارش
  useEffect(() => {
    if (currentUser) {
      fetchAdminData(currentUser).then((data) => {
        if (data?.success) {
          console.log("Admin data verified:", data.user);
        } else {
          toast.error("دسترسی ادمین معتبر نیست");
        }
      });
    }
  }, [currentUser]);

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const t = toast.loading("در حال ثبت سفارش...");

    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");
      if (!xsrfToken) throw new Error("CSRF token not found");

      const res = await fetch("http://localhost:9000/api/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("سفارش با موفقیت ثبت شد!", { id: t });
      } else {
        toast.error(data.message || "خطا در ثبت سفارش", { id: t });
      }
    } catch (err: any) {
      toast.error(err.message || "خطای سرور", { id: t });
    } finally {
      setLoading(false);
    }
  }
  // ----------------------------------load orders--------------
  useEffect(() => {
    loadOrders();
  }, []);

  // --------------------------------------------------------------
  return (
    <>
      <div className="space-y-3">
        <Toaster />
        <form onSubmit={submitHandler} className="flex flex-col space-y-2">
          <input
            placeholder="نام مشتری"
            className=" text-green p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, customer_name: e.target.value })
            }
            required
          />
          <input
            placeholder="آدرس سایت"
            className=" text-green p-2 rounded"
            onChange={(e) => setForm({ ...form, website_url: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="تعداد صفحات"
            className=" text-green p-2 rounded"
            onChange={(e) => setForm({ ...form, pages_count: +e.target.value })}
            min={1}
            required
          />
          <input
            type="number"
            placeholder="قیمت نهایی"
            className=" text-green p-2 rounded"
            onChange={(e) => setForm({ ...form, total_price: +e.target.value })}
            min={0}
            required
          />
          <select
            onChange={(e) => setForm({ ...form, payment_type: e.target.value })}
            className=" text-green p-2 rounded"
          >
            <option value="no_gateway">بدون درگاه</option>
            <option value="gateway">دارای درگاه</option>
          </select>
          <select
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className=" text-green p-2 rounded"
          >
            <option value="pending">در انتظار</option>
            <option value="paid">پرداخت شده</option>
            <option value="shipped">ارسال شده</option>
            <option value="delivered">تحویل شده</option>
            <option value="cancelled">لغو شده</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "در حال ثبت..." : "ثبت سفارش"}
          </button>
        </form>
        {/* Orders List */}
        <div className="mt-6 bg-white rounded shadow p-4">
          <h3 className="text-lg font-bold mb-3">لیست سفارش‌ها</h3>

          {ordersLoading && <p className="text-gray-500">در حال بارگذاری...</p>}

          {!ordersLoading && orders.length === 0 && (
            <p className="text-gray-500">سفارشی ثبت نشده است</p>
          )}

          <div className="space-y-2">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded p-3 flex flex-col md:flex-row md:justify-between gap-2"
              >
                <div>
                  <p className="font-semibold">{order.customer_name}</p>
                  <p className="text-sm text-gray-500">{order.website_url}</p>
                  <p className="text-sm">تعداد صفحات: {order.pages_count}</p>
                </div>

                <div className="text-sm flex flex-col gap-2 items-end">
                  <p>💰 {order.total_price.toLocaleString()} تومان</p>
                  <p>💳 {order.payment_type}</p>
                  <p
                    className={`font-semibold ${
                      order.status === "paid"
                        ? "text-green-600"
                        : order.status === "cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </p>

                  <button
                    onClick={() => setDeleteOrderId(order.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    حذف سفارش 🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {deleteOrderId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-red-600 mb-2">حذف سفارش</h3>

            <p className="text-gray-700 mb-4">
              آیا از حذف این سفارش مطمئن هستید؟
              <br />
              <span className="text-sm text-gray-500">
                این عملیات غیرقابل بازگشت است.
              </span>
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteOrderId(null)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
                disabled={deleteLoading}
              >
                انصراف
              </button>

              <button
                onClick={confirmDeleteOrder}
                disabled={deleteLoading}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoading ? "در حال حذف..." : "حذف قطعی"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}




