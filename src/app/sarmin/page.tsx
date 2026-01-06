// app/sarmin/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function SarminPage() {
  const router = useRouter();

  const handleBuy = () => {
    router.push("/checkout/user-info");
  };

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-100 to-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">سارمین | Sarmin</h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          پلتفرم هوشمند طراحی سایت، فروش آنلاین و منوی دیجیتال برای کسب‌وکارهای
          ایرانی
        </p>
        <button
          onClick={handleBuy}
          className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-md hover:opacity-90 transition-all"
        >
          خرید سایت و شروع فروش
        </button>
      </section>

      {/* Why Sarmin */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-12">چرا سارمین؟</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">منوی دیجیتال QR</h3>
            <p className="text-gray-600 text-sm">
              سریع، ریسپانسیو و بدون نیاز به اپلیکیشن
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">مدیریت سفارش لحظه‌ای</h3>
            <p className="text-gray-600 text-sm">
              ثبت و پردازش سفارش‌ها بدون خطا
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">پرداخت آنلاین امن</h3>
            <p className="text-gray-600 text-sm">
              امنیت بالا برای فروش سایت و خرید آنلاین
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">برندینگ اختصاصی</h3>
            <p className="text-gray-600 text-sm">
              دامنه و لوگوی مخصوص کسب‌وکار شما
            </p>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">درباره سارمین</h2>
        <p className="text-gray-600 mb-4">
          سارمین (Sarmin) یک پلتفرم و شرکت فعال در حوزه{" "}
          <strong>طراحی سایت، خرید سایت و فروش سایت</strong> است که با هدف ارائه
          راهکارهای دیجیتال نوآورانه برای کسب‌وکارهای ایرانی تأسیس شد.
        </p>
        <p className="text-gray-600 mb-4">
          ما با تیمی متخصص و خلاق، تمرکز خود را بر طراحی وب‌سایت‌های مدرن،
          منوهای دیجیتال ریسپانسیو و سیستم‌های هوشمند فروش آنلاین قرار داده‌ایم.
        </p>
        <p className="text-gray-600">
          از منوی دیجیتال QR گرفته تا مدیریت سفارش‌ها به‌صورت لحظه‌ای و پرداخت
          آنلاین امن، سارمین در تمام مراحل رشد کسب‌وکار آنلاین، کنار شماست.
        </p>
      </section>

      {/* CTA Purchase */}
      <section className="bg-gradient-to-b from-gray-100 to-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          فروش آنلاین را با سارمین شروع کنید
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          با <strong>سارمین</strong> در چند دقیقه سایت فروشگاهی یا منوی دیجیتال
          خود را راه‌اندازی کنید. بدون دانش فنی، با پرداخت آنلاین امن و مدیریت
          سفارش حرفه‌ای.
        </p>
        <button
          onClick={handleBuy}
          className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-md hover:opacity-90 transition-all"
        >
          خرید سایت و شروع فروش
        </button>
      </section>

      {/* Footer */}
     
    </main>
  );
}
