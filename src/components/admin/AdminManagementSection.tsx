"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Admin {
  id: number;
  name: string;
  email: string;
}

export default function AdminManagementSection() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [adminName, setAdminName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ---------------- CSRF Helper ----------------
  function getCookie(name: string) {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
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

  // ---------------- Load Admins ----------------
  async function loadAdmins() {
    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");
      const res = await fetch("http://localhost:9000/api/users/admins", {
        headers: { "X-XSRF-TOKEN": xsrfToken! },
        credentials: "include",
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setAdmins(data.data);
      } else {
        setAdmins([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("خطا در بارگذاری ادمین‌ها");
    }
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  // ---------------- Add Admin ----------------
  async function handleAddAdmin() {
    if (!adminName.trim() || !adminEmail.trim() || !adminPassword.trim()) {
      toast.error("همه فیلدها الزامی هستند");
      return;
    }

    setLoading(true);
    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");

      const res = await fetch("http://localhost:9000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": xsrfToken!,
        },
        credentials: "include",
        body: JSON.stringify({
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          role: "admin",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطا در ثبت ادمین");

      toast.success("ادمین اضافه شد");
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
      loadAdmins();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "خطا در سرور");
    } finally {
      setLoading(false);
    }
  }

  // ---------------- Delete Admin ----------------
  async function handleDeleteAdmin(id: number) {
    if (!confirm("آیا می‌خواهید این ادمین حذف شود؟")) return;

    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");

      const res = await fetch(`http://localhost:9000/api/users/${id}`, {
        method: "DELETE",
        headers: { "X-XSRF-TOKEN": xsrfToken! },
        credentials: "include",
      });

      if (!res.ok) throw new Error("خطا در حذف ادمین");

      toast.success("ادمین حذف شد");
      loadAdmins();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "خطا در سرور");
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">مدیریت ادمین‌ها</h2>

      {/* Add Admin Form */}
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="نام ادمین"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAddAdmin}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? "در حال ثبت..." : "اضافه کردن"}
        </button>
      </div>

      {/* Admin List */}
      <div className="space-y-2">
        {admins.length === 0 && (
          <p className="text-gray-500">هیچ ادمینی ثبت نشده است</p>
        )}
        {admins.map((a: Admin) => (
          <div
            key={a.id}
            className="flex items-center justify-between border rounded p-2"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                {a.name[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{a.name}</p>
                <p className="text-sm text-gray-500">{a.email}</p>
              </div>
            </div>
            <button
              onClick={() => handleDeleteAdmin(a.id)}
              className="text-red-600 hover:underline"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
