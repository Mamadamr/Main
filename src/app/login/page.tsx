"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
type LoginResponse = {
  success: boolean;
  code: number;
  message?: string;
  user?: any;
};
// ---------------- API Helper ----------------

// گرفتن کوکی XSRF-TOKEN
function getCookie(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  if (!cookie) return null; // Laravel's XSRF-TOKEN cookie value is URL-encoded, so decode it.
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

// لاگین ادمین
export async function adminLogin(formData: FormData) {
  await csrfToken(); // مرحله مهم

  const xsrfToken = getCookie("XSRF-TOKEN");
  if (!xsrfToken) throw new Error("CSRF token not found");

  const res = await fetch(`http://localhost:9000/api/login`, {
    method: "POST",
    credentials: "include", // خیلی مهم
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": xsrfToken,
    },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

// ---------------- صفحه لاگین ----------------
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
   const [user, setUser] = useState<any>(null);
  useEffect(() => {
    if (!user) return;

    // وقتی کاربر لاگین شد و role admin هست
    if (user.role === "admin") {
      router.push("/admin");
    } else {
      toast.error("شما دسترسی ادمین ندارید");
    }
  }, [user, router]);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    const t = toast.loading("در حال ورود...");

    try {
      const data = await adminLogin(formData);
      if (data.success && data.user) {
        toast.success("ورود موفق!", { id: t });
        setUser(data.user); // ⚡ به جای push مستقیم، user رو ست می‌کنیم و useEffect مدیریت می‌کنه
      } else {
        toast.error(data.message || "اطلاعات نامعتبر", { id: t });
      }
    } catch (err: any) {
      toast.error(err.message || "خطای سرور", { id: t });
    } finally {
      setLoading(false);
    }
  
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold mb-2 text-center">ورود ادمین</h2>
        <input
          name="email"
          type="email"
          placeholder="ایمیل"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          required
          className="w-full border p-2 rounded"
        />
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}
