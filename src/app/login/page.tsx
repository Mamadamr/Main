"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // اعتبارسنجی ساده
    if (!email || !password) {
      toast.error("لطفا همه فیلدها را پر کنید");
      setLoading(false);
      return;
    }

    try {
      // فرض کن API login داری
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("ایمیل یا رمز عبور اشتباه است");

      const data = await res.json();

      // ست کردن کوکی به روش استاندارد (کلاینت)
      document.cookie = `admin_token=${data.token}; Path=/; Secure; SameSite=Lax; Max-Age=3600`;

      toast.success("ورود موفقیت‌آمیز بود");

      setTimeout(() => {
        window.location.href = "https://sarminco.ir/admin";
      }, 500);
    } catch (err: any) {
      toast.error(err.message || "خطا در ورود");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">ورود ادمین</h1>

        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}
