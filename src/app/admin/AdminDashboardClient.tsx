"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import StatsCard from "@/components/admin/StatsCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// ---------------- CSRF ----------------
function getCookie(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

async function csrf() {
  await fetch("http://localhost:9000/sanctum/csrf-cookie", {
    credentials: "include",
  });
}

// ---------------- Fetch Admin ----------------
async function fetchAdmin() {
  await csrf();
  const res = await fetch("http://localhost:9000/api/me", {
    credentials: "include",
  });
  return res.json();
}

// ---------------- Fetch Orders ----------------
async function fetchOrders() {
  await csrf();
  const res = await fetch("http://localhost:9000/api/orders", {
    credentials: "include",
  });
  const data = await res.json();
  return data.data || [];
}

// ---------------- Dashboard ----------------
export default function AdminDashboardClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function init() {
      const admin = await fetchAdmin();

      if (!admin?.success || admin.user?.role !== "admin") {
        toast.error("دسترسی غیرمجاز");
        router.push("/login");
        return;
      }

      const ordersData = await fetchOrders();
      setOrders(ordersData);
      setLoading(false);
    }

    init();
  }, [router]);

  // ---------------- تحلیل سفارشات ----------------
  const statusCount = {
    pending: 0,
    paid: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  orders.forEach((o) => {
    if (statusCount[o.status as keyof typeof statusCount] !== undefined) {
      statusCount[o.status as keyof typeof statusCount]++;
    }
  });

  const chartData = {
    labels: ["در انتظار", "پرداخت شده", "ارسال شده", "تحویل شده", "لغو شده"],
    datasets: [
      {
        label: "تعداد سفارشات",
        data: Object.values(statusCount),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <Toaster />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="در انتظار" value={statusCount.pending} />
        <StatsCard title="پرداخت شده" value={statusCount.paid} />
        <StatsCard title="تحویل شده" value={statusCount.delivered} />
        <StatsCard title="لغو شده" value={statusCount.cancelled} />
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">نمودار وضعیت سفارشات</h2>

        {loading ? <p>در حال بارگذاری...</p> : <Line data={chartData} />}
      </div>

      <button
        onClick={() => router.push("/login")}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        خروج
      </button>
    </div>
  );
}
