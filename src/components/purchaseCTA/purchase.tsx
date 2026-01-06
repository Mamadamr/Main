"use client";
import { useRouter } from "next/navigation";

export default function PurchaseCTA() {
  const router = useRouter();

  const handleBuy = () => {
    router.push("/checkout/user-info");
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        فروش آنلاین را با سارمین شروع کنید
      </h2>

      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        با <strong>سارمین</strong> در چند دقیقه سایت فروشگاهی یا منوی دیجیتال
        خود را راه‌اندازی کنید. بدون دانش فنی، با پرداخت آنلاین امن و مدیریت
        سفارش حرفه‌ای.
      </p>

      <button
        onClick={handleBuy}
        className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold
        shadow-lg hover:shadow-md hover:opacity-90 transition-all"
      >
        خرید سایت و شروع فروش
      </button>
    </section>
  );
}
