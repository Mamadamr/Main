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
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            درباره سارمین | Sarmin
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            سارمین (Sarmin) یک پلتفرم و شرکت فعال در حوزه طراحی سایت، خرید سایت
            و فروش سایت است که با هدف ارائه راهکارهای دیجیتال نوآورانه برای
            کسب‌وکارهای ایرانی تأسیس شد. ما به کسب‌وکارها کمک می‌کنیم حضور
            آنلاین حرفه‌ای، سریع و قابل اعتماد داشته باشند.
            <br />
            <br />
            با تکیه بر تیمی متخصص و خلاق، تمرکز ما بر طراحی وب‌سایت‌های مدرن،
            منوهای دیجیتال ریسپانسیو و سیستم‌های هوشمند فروش آنلاین است؛
            راهکارهایی که تجربه کاربری روان و فروش بیشتر را برای شما به همراه
            دارد. از منوی دیجیتال QR گرفته تا مدیریت سفارش‌ها به‌صورت لحظه‌ای و
            پرداخت آنلاین امن، سارمین در تمام مراحل راه‌اندازی و رشد کسب‌وکار
            آنلاین، کنار شماست تا برندتان را به سطح بالاتری برسانید.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            از توسعه منوهای دیجیتال ریسپانسیو گرفته تا سیستم‌های مدیریت سفارش و
            پرداخت آنلاین، ما همیشه در کنار شما هستیم تا کسب‌وکار شما را به سطح
            بعدی ارتقا دهیم.
          </p>

          <Link
            href="/checkout/user-info"
            className="bg-gray-300!  text-white px-6 py-3 rounded-full hover:opacity-90 transition-all"
          >
            شروع همکاری با سارمین
          </Link>
        </div>
      </div>
    </section>
  );
}
