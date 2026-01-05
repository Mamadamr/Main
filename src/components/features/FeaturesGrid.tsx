"use client";
import FeatureCard from "./FeaturesCard";

const items = [
  { title: "منوی دیجیتال", desc: "QR Menu سریع و ریسپانسیو" },
  { title: "مدیریت سفارش", desc: "Real-Time Orders بدون خطا" },
  { title: "پرداخت آنلاین", desc: "Secure Payment با امنیت بالا" },
  { title: "برندینگ", desc: "Logo و Domain اختصاصی" },
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
