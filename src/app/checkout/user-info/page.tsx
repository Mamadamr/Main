"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button";

export default function UserInfoPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!name || !email || !phone) return;

    setLoading(true);

    try {
      // می‌توانید اینجا داده‌ها را به backend بفرستید یا context ذخیره کنید
      // مثال: await api.saveUserInfo({ name, email, phone });

      // ریدایرکت به مرحله بعدی (پرداخت)
      router.push("/checkout/payment");
    } catch (error) {
      console.error("خطا در ذخیره اطلاعات:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          اطلاعات کاربر
        </h1>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <div>
            <label className="block mb-1 text-gray-700">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="مثال: محمد رضایی"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">ایمیل</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">شماره تماس</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="0912xxxxxxx"
            />
          </div>

          <Button >
            {loading ? "در حال ادامه..." : "ادامه به پرداخت"}
          </Button>
        </form>
      </div>
    </div>
  );
}
