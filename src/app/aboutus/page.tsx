"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* تصویر */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="/img-sherkat/sherkat.jpg"
            alt="تیم Sarmin"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* متن */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">درباره ما</h2>
          <p className="text-gray-600 mb-4">
            ما در Sarmin با هدف دیجیتال کردن کسب‌وکارها و ارائه تجربه کاربری
            حرفه‌ای، به کسب‌وکارها کمک می‌کنیم تا فروش خود را افزایش دهند و
            مشتریانشان را راضی نگه دارند.
          </p>
          <p className="text-gray-600 mb-6">
            تیم ما متشکل از برنامه‌نویسان و طراحان مجرب است که همواره در تلاشند
            تا بهترین و مدرن‌ترین راهکارهای دیجیتال را ارائه دهند.
          </p>
          <Link href="/checkout/user-info" className="bg-primary text-white px-6 py-3 rounded-full hover:opacity-90 transition-all shadow-md">
            شروع همکاری
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
