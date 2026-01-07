"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button";

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
};

export default function UserInfoPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  // ===== Regex =====
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^09\d{9}$/;

  // ===== Field Validators =====
  const validateField = (field: keyof Errors, value: string) => {
    let error = "";

    if (!value.trim()) {
      error = "این فیلد الزامی است";
    } else if (field === "email" && !emailRegex.test(value)) {
      error = "ایمیل معتبر نیست";
    } else if (field === "phone" && !phoneRegex.test(value)) {
      error = "شماره موبایل باید 11 رقم و با 09 شروع شود";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  // ===== Full Form Validation (Submit) =====
  const validateForm = () => {
    const validations = [
      validateField("name", name),
      validateField("email", email),
      validateField("phone", phone),
    ];

    return validations.every(Boolean);
  };

  // ===== Submit =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      router.push("/checkout/payment");
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

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* نام */}
          <div>
            <label className="block mb-1 text-gray-700">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => validateField("name", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              placeholder="محمد رضایی"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* ایمیل */}
          <div>
            <label className="block mb-1 text-gray-700">ایمیل</label>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateField("email", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* موبایل */}
          <div>
            <label className="block mb-1 text-gray-700">شماره تلفن همراه</label>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              onBlur={(e) => validateField("phone", e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              placeholder="09123456789"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <Button>
            {loading ? "در حال بررسی..." : "ادامه به پرداخت"}
          </Button>
        </form>
      </div>
    </div>
  );
}
