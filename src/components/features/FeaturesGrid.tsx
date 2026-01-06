"use client";
import FeatureCard from "./FeaturesCard";

const items = [
  {
    title: "منوی دیجیتال",
    desc: "منوی دیجیتال سریع و ریسپانسیو و سازگار با موبایل که بدون نصب اپلیکیشن و تنهااسکن کیو آر کد که در دسترس مشتریان قرار می گیرد",
  },
  {
    title: "مدیریت سفارش‌ها به‌صورت لحظه‌ای (Real-Time Orders)",
    desc: "دریافت و مدیریت سفارش‌ها در لحظه و بدون خطا و بدون سردرگمی و  سارمین فرآیند فروش آنلاین را دقیق و خودکار می‌کند.",
  },
  {
    title: "پرداخت آنلاین امن (Secure Payment)",
    desc: "اتصال به درگاه‌های پرداخت معتبر با بالاترین سطح امنیت و برای خرید سایت و فروش آنلاین بدون نگرانی.",
  },
  {
    title: "برندینگ حرفه‌ای با لوگو و دامنه اختصاصی",
    desc: "ساخت سایت فروشگاهی با دامنه و لوگوی اختصاصی برای افزایش اعتماد مشتری و رشد برند شما.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-[#c5c5cb] rounded-xl py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
