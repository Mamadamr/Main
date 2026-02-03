"use client";

import { FormEvent, useEffect, useState } from "react";

type FormState = {
  planModel: string;
  name: string;
  email: string;
  website: string;
  phone: string;
  pageCount: string;
  message: string;
};

type ContactInfo = {
  email: string | null;
  phone: string | null;
  address: string | null;
};

const initialFormState: FormState = {
  planModel: "",
  name: "",
  email: "",
  website: "",
  phone: "",
  pageCount: "",
  message: "",
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: null,
    phone: null,
    address: null,
  });
  const [contactLoading, setContactLoading] = useState(true);
  const [contactError, setContactError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchValue = async (url: string) => {
      const response = await fetch(url, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
      }
      const payload = await response.json();

      if (typeof payload === "string") return payload;
      if (payload?.data) {
        if (typeof payload.data === "string") return payload.data;
        if (payload.data?.value) return payload.data.value;
      }
      if (payload?.value) return payload.value;
      if (payload?.email) return payload.email;
      if (payload?.phone) return payload.phone;
      if (payload?.address) return payload.address;

      const firstPrimitive = Object.values(payload).find(
        (val) => typeof val === "string",
      );
      if (typeof firstPrimitive === "string") return firstPrimitive;

      throw new Error(`Unexpected payload structure from ${url}`);
    };

    const loadContactInfo = async () => {
      try {
        const [email, phone, address] = await Promise.all([
          fetchValue("http://localhost:9000/api/emailaddress"),
          fetchValue("http://localhost:9000/api/phoneNumber"),
          fetchValue("http://localhost:9000/api/localAddress"),
        ]);

        if (!isMounted) return;
        setContactInfo({
          email: email || "در دسترس نیست",
          phone: phone || "در دسترس نیست",
          address: address || "در دسترس نیست",
        });
        setContactError(null);
      } catch (error) {
        console.error("Contact info fetch error:", error);
        if (!isMounted) return;
        setContactError(
          "امکان دریافت اطلاعات تماس وجود ندارد. لطفاً کمی بعد دوباره تلاش کنید.",
        );
      } finally {
        if (isMounted) {
          setContactLoading(false);
        }
      }
    };

    loadContactInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const resetForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ status: "idle", message: "" });

    try {
      const csrfResponse = await fetch(
        "http://localhost:9000/sanctum/csrf-cookie",
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!csrfResponse.ok) {
        throw new Error("خطا در دریافت کوکی CSRF");
      }

      const payload = {
        plan_model: formData.planModel,
        name: formData.name,
        email: formData.email,
        website: formData.website,
        phone: formData.phone,
        page_count: formData.pageCount ? Number(formData.pageCount) : null,
        message: formData.message,
      };

      const response = await fetch(
        "http://localhost:9000/api/contact-requests",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const errorMessage =
          errorBody?.message || "ثبت درخواست با خطا مواجه شد.";
        throw new Error(errorMessage);
      }

      setSubmitResult({
        status: "success",
        message:
          "درخواست شما با موفقیت ثبت شد. در اسرع وقت با شما تماس خواهیم گرفت.",
      });
      resetForm();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "لطفاً کمی بعد دوباره تلاش کنید.";
      setSubmitResult({ status: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 py-16 px-4">
      <section className="max-w-3xl mx-auto space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          درخواست پلن و تماس با ما
        </h1>
        <p className="text-lg text-slate-700">
          فرم زیر را تکمیل کنید تا تیم ما با شما برای هماهنگی پلن انتخابی و
          جزئیات پروژه تماس بگیرد.
        </p>
      </section>

      <section className="mt-12 max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-xl"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="planModel"
                className="block text-sm font-medium text-slate-800"
              >
                مدل پلن موردنظر
              </label>
              <input
                id="planModel"
                name="planModel"
                type="text"
                required
                value={formData.planModel}
                onChange={handleChange("planModel")}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="مثلاً پلن ویژه یا پلن پایه"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-800"
              >
                نام و نام خانوادگی
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange("name")}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="نام کامل شما"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-800"
              >
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange("email")}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="example@email.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-slate-800"
              >
                آدرس وب‌سایت
              </label>
              <input
                id="website"
                name="website"
                type="url"
                required
                value={formData.website}
                onChange={handleChange("website")}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="https://yourdomain.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-800"
              >
                شماره تماس
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange("phone")}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="مثلاً 09123456789"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pageCount"
                className="block text-sm font-medium text-slate-800"
              >
                تعداد صفحات سایت درخواستی
              </label>
              <input
                id="pageCount"
                name="pageCount"
                type="number"
                min={1}
                required
                value={formData.pageCount}
                onChange={handleChange("pageCount")}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="مثلاً 5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-800"
            >
              پیام به ادمین
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange("message")}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="جزئیات یا پرسش‌های خود را بنویسید..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-indigo-500 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال درخواست"}
            </button>
          </div>

          {submitResult.status !== "idle" && (
            <p
              className={`text-sm font-medium ${
                submitResult.status === "success"
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {submitResult.message}
            </p>
          )}
        </form>

        <div className="mt-12 rounded-3xl bg-slate-900 px-8 py-6 text-white shadow-2xl">
          <h2 className="text-2xl text-white! font-semibold">راه‌های ارتباطی مستقیم</h2>

          {contactLoading ? (
            <p className="mt-4 text-sm text-white!">
              در حال دریافت اطلاعات...
            </p>
          ) : contactError ? (
            <p className="mt-4 text-sm text-red-400!">{contactError}</p>
          ) : (
            <>
              <p className="mt-4 text-lg">
                ایمیل:{" "}
                <span className="font-bold">
                  {contactInfo.email ?? "نامشخص"}
                </span>
              </p>
              <p className="mt-2 text-lg">
                تلفن:{" "}
                <span className="font-bold">
                  {contactInfo.phone ?? "نامشخص"}
                </span>
              </p>
              <p className="mt-2 text-lg">
                آدرس:{" "}
                <span className="font-bold">
                  {contactInfo.address ?? "نامشخص"}
                </span>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
