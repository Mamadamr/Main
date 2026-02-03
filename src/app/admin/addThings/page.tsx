"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

type BannerForm = {
  title: string;
  subtitle: string;
  link: string;
  status: "active" | "inactive";
  image: File | null;
};

type Banner = {
  id: number;
  title: string;
  subtitle?: string | null;
  link?: string | null;
  status: "active" | "inactive";
  image?: string | null;
};

const initialForm: BannerForm = {
  title: "",
  subtitle: "",
  link: "",
  status: "active",
  image: null,
};

export default function AdminAddThingsPage() {
  const [form, setForm] = useState<BannerForm>(initialForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);

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

  // ---------------- Load Current Banner ----------------
  async function loadCurrentBanner() {
    try {
      const res = await fetch("http://localhost:9000/api/banners/latest", {
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.success && data?.data) {
        setCurrentBanner(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadCurrentBanner();
  }, []);

  // ---------------- Handle Image ----------------
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  }

  // ---------------- Submit Handler ----------------
  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("عنوان الزامی است");
      return;
    }
    if (!form.image) {
      toast.error("تصویر بنر را انتخاب کنید");
      return;
    }

    setLoading(true);
    const t = toast.loading("در حال ارسال بنر...");

    try {
      await csrfToken();
      const xsrfToken = getCookie("XSRF-TOKEN");

      const body = new FormData();
      body.append("title", form.title);
      body.append("subtitle", form.subtitle);
      body.append("link", form.link);
      body.append("status", form.status);
      body.append("image", form.image);

      const res = await fetch("http://localhost:9000/api/banners", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": xsrfToken || "",
        },
        body,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("بنر با موفقیت ثبت شد!", { id: t });
        setForm(initialForm);
        setPreview(null);
        loadCurrentBanner();
      } else {
        toast.error(data.message || "خطا در ثبت بنر", { id: t });
      }
    } catch (err: any) {
      toast.error(err.message || "خطای سرور", { id: t });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="max-w-3xl mx-auto space-y-8">
        <form
          onSubmit={submitHandler}
          className="bg-white p-6 rounded shadow-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">
            افزودن / جایگزینی بنر
          </h2>

          <input
            type="text"
            placeholder="عنوان بنر"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="زیرعنوان (دلخواه)"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="url"
            placeholder="لینک بنر (دلخواه)"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as "active" | "inactive",
              })
            }
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {preview && (
            <img
              src={preview}
              alt="Banner Preview"
              className="w-full max-h-64 object-cover rounded"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "در حال ارسال..." : "ثبت بنر"}
          </button>
        </form>

        {currentBanner && (
          <div className="bg-white p-6 rounded shadow-md space-y-4">
            <h3 className="text-xl font-bold">آخرین بنر ذخیره‌شده</h3>
            {currentBanner.image ? (
              <img
                src={`http://localhost:9000/storage/${currentBanner.image}`}
                alt={currentBanner.title}
                className="w-full max-h-64 object-cover rounded"
              />
            ) : (
              <p className="text-gray-400">تصویری ثبت نشده است.</p>
            )}
            <div>
              <p className="text-lg font-semibold">{currentBanner.title}</p>
              {currentBanner.subtitle && (
                <p className="text-gray-600">{currentBanner.subtitle}</p>
              )}
              {currentBanner.link && (
                <p className="text-blue-600 break-words">
                  {currentBanner.link}
                </p>
              )}
              <span
                className={`inline-block text-xs px-2 py-1 rounded mt-2 ${
                  currentBanner.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {currentBanner.status === "active" ? "فعال" : "غیرفعال"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
