"use client";

import PortfolioCard from "./PortfolioCard";

const projects = [
  {
    title: "وبسایت شرکتی",
    description: "UI/UX مدرن و ریسپانسیو",
    image: "/resume/resume4.png",
    link: "/",
  },
  {
    title: "فروشگاه آنلاین",
    description: "سفارشی‌سازی با Next.js و Tailwind",
    image: "/resume/resume2.png",
    link: "/",
  },
  {
    title: "سایت شخصی",
    description: "Landing Page مدرن",
    image: "/resume/resume4.png",
    link: "/",
  },
  {
    title: "اپلیکیشن وب",
    description: "React + Tailwind + Animations",
    image: "/resume/resume3.png",
    link: "/",  
  },
];

export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          پروژه‌های طراحی شده
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <PortfolioCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
