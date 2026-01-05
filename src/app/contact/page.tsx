"use client";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // شبیه‌سازی ارسال فرم
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-gray-800 text-center">
          تماس با ما
        </h2>
        <p className="text-gray-600 mb-12 text-center">
          اگر سوالی دارید یا می‌خواهید با ما همکاری کنید، فرم زیر را پر کنید و
          ما در اسرع وقت با شما تماس می‌گیریم.
        </p>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="نام شما"
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ایمیل شما"
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="پیام شما"
            required
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={5}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 transition-all shadow-md"
          >
            {loading ? "در حال ارسال..." : "ارسال پیام"}
          </button>

          {success && (
            <p className="text-green-600 mt-4 text-center font-medium">
              پیام شما با موفقیت ارسال شد!
            </p>
          )}
        </form>

        <div className="mt-12 text-center text-gray-600">
          <p>📍 آدرس: تهران، ایران</p>
          <p>📞 Number :09017497886</p>
          <p>✉ ایمیل: info@sarmin.ir</p>
        </div>
      </div>
    </section>
  );
}
