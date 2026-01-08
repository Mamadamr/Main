"use client";

import { adminLogin } from "@/app/actions/admin-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    const t = toast.loading("در حال ورود...");

    try {
      await adminLogin(formData);
      toast.success("ورود موفق!", { id: t });
      router.push("/admin");
    } catch (err) {
      toast.error("اطلاعات نامعتبر است", { id: t });
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
          placeholder="ایمیل"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          className="w-full border p-2 rounded"
        />
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
