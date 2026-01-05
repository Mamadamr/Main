"use client";

import Link from "next/link";

export default function About() {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* تصویر شرکت / تیم */}
        <div className="w-full">
          <img
            src="/img-sherkat/sherkat.jpg"
            alt="تیم Sarmin"
            className="rounded-2xl shadow-lg object-cover w-full h-full"
          />
        </div>

        {/* متن درباره ما */}
        <div className="text-right">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">درباره ما</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            شرکت <span className="font-semibold text-primary">Sarmin</span> با
            هدف ارائه راهکارهای دیجیتال نوآورانه و طراحی وب‌سایت‌های حرفه‌ای
            برای کسب‌وکارها در ایران تأسیس شد. ما با تیمی متخصص و خلاق، سعی
            داریم تجربه کاربری بی‌نظیری را به مشتریان خود ارائه دهیم.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            از توسعه منوهای دیجیتال ریسپانسیو گرفته تا سیستم‌های مدیریت سفارش و
            پرداخت آنلاین، ما همیشه در کنار شما هستیم تا کسب‌وکار شما را به سطح
            بعدی ارتقا دهیم.
          </p>

          <Link href="/checkout/user-info" className="bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 transition-all">
            شروع همکاری
          </Link>
        </div>
      </div>
    </section>
  );
}
