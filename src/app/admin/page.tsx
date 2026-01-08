"use client";

import StatsCard from "@/components/admin/StatsCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import clsx from "clsx";
const orderStats = [
  { day: "شنبه", new: 5, processing: 3, completed: 8, canceled: 1 },
  { day: "یک‌شنبه", new: 2, processing: 6, completed: 4, canceled: 0 },
  { day: "دوشنبه", new: 8, processing: 2, completed: 10, canceled: 2 },
  { day: "سه‌شنبه", new: 4, processing: 5, completed: 7, canceled: 1 },
  { day: "چهارشنبه", new: 6, processing: 4, completed: 5, canceled: 0 },
  { day: "پنج‌شنبه", new: 3, processing: 3, completed: 6, canceled: 0 },
  { day: "جمعه", new: 7, processing: 2, completed: 8, canceled: 1 },
];

export default function AdminDashboard() {
  const router = useRouter();

const handleLogout = async () => {
  try {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      toast.success("خروج موفق!");
      router.replace("/login"); // ← replace بهتره تا back کار نکنه
    } else {
      toast.error("خطا در خروج");
    }
  } catch {
    toast.error("خطا در ارتباط با سرور");
  }
};




  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="سفارشات جدید" value={35} />
        <StatsCard title="در حال پردازش" value={25} />
        <StatsCard title="تکمیل شده" value={48} />
        <StatsCard title="لغو شده" value={5} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">نمودار وضعیت سفارشات هفته</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="new" stroke="#1f2937" name="جدید" />
            <Line
              type="monotone"
              dataKey="processing"
              stroke="#3b82f6"
              name="در حال پردازش"
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#10b981"
              name="تکمیل شده"
            />
            <Line
              type="monotone"
              dataKey="canceled"
              stroke="#ef4444"
              name="لغو شده"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        خروج
      </button>
    </div>
  );
}
