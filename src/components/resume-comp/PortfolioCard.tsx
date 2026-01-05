"use client";

import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
  link?: string;
};

export default function PortfolioCard({
  title,
  description,
  image,
  link,
}: Props) {
  return (
    <a
      href={link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative w-full h-64 sm:h-56 md:h-72 lg:h-64">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-gray-200 text-sm mt-1">{description}</p>
      </div>
    </a>
  );
}
