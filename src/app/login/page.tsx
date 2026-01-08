"use client";

import { adminLogin } from "@/app/actions/admin-login";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await adminLogin(formData);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("ورود موفق!");
    setTimeout(() => {
      router.push("/admin");
    }, 600);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-right" />

      <form
        action={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">ورود ادمین</h1>

        <input
          name="username"
          placeholder="نام کاربری"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          className="w-full border p-2 rounded"
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          ورود
        </button>
      </form>
    </div>
  );
}
