type Props = {
  title: string;
  desc: string;
};

export default function FeatureCard({ title, desc }: Props) {
  return (
    <div
      className="
        group relative
        bg-white
        rounded-2xl
        p-6
        text-center
        border border-gray-100
        shadow-[0_8px_24px_rgba(0,0,0,0.06)]
        hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)]
        transition-all duration-300
        hover:-translate-y-2
      "
    >
      {/* Accent bar */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2
          h-1 w-12 rounded-full
          bg-primary
          opacity-0 group-hover:opacity-100
          transition
        "
      />

      {/* Soft glow */}
      <div
        className="
          absolute inset-0 rounded-2xl
          bg-primary-soft
          opacity-0 group-hover:opacity-100
          transition
          pointer-events-none
        "
      />

      <h3 className="relative font-semibold text-lg text-[#1D1D1F] mb-2">
        {title}
      </h3>

      <p className="relative text-sm text-[#6E6E73] leading-relaxed">{desc}</p>
    </div>
  );
}
