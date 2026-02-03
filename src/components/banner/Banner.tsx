"use client";

import { useEffect, useState } from "react";

type Banner = {
  id: number;
  title: string;
  subtitle?: string | null;
  link?: string | null;
  status: "active" | "inactive";
  image?: string | null;
};

export default function HomePage() {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const res = await fetch("http://localhost:9000/api/banners/latest", {
          cache: "no-store",
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data?.success && data?.data && data.data.status === "active") {
          setBanner(data.data);
        } else {
          setBanner(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBanner();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {loading ? (
        <p className="text-gray-500">در حال بارگذاری بنر...</p>
      ) : banner ? (
        <div className="relative w-full max-w-5xl rounded-lg overflow-hidden shadow-lg bg-white">
          {banner.image && (
            <img
              src={`http://localhost:9000/storage/${banner.image}`}
              alt={banner.title}
              className="w-full max-h-[480px] object-cover"
            />
          )}
          <div className="p-6 space-y-2">
            <h1 className="text-2xl font-bold">{banner.title}</h1>
            {banner.subtitle && (
              <p className="text-gray-600 text-lg">{banner.subtitle}</p>
            )}
            {banner.link && (
              <a
                href={banner.link}
                className="inline-block text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                مشاهده لینک
              </a>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-400">در حال حاضر بنری جهت نمایش وجود ندارد.</p>
      )}
    </main>
  );
}
