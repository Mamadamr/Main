"use client";
import { useRouter } from "next/navigation";

export default function PurchaseCTA() {
  const router = useRouter();

  const handleBuy = () => {
    // هدایت کاربر به صفحه خرید
    router.push("/checkout/user-info");
  };

  return (
    <section className="bg-gradient-to-r from-gray-100 to-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        شروع کنید و کسب‌وکارتان را دیجیتال کنید
      </h2>
      <p className="text-gray-600 mb-8">
        همین حالا پلن مناسب خود را انتخاب کنید و تجربه‌ی یک فروشگاه آنلاین
        حرفه‌ای را داشته باشید.
      </p>

      <button
        onClick={handleBuy}
        className="bg-primary hover:shadow-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
      >
        خرید و شروع
      </button>
    </section>
  );
}
