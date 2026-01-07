import Link from "next/link";

type Props = {
  id: string;
  title: string;
  price: string;
  desc: string;
  features: string[];
  featured?: boolean;
};

export default function PlanCard({
  id,
  title,
  price,
  desc,
  features,
  featured,
}: Props) {
  return (
    <div
      className={`
        relative rounded-2xl p-8 bg-white border
        ${
          featured
            ? "border-primary shadow-strong scale-105"
            : "border-border shadow-soft"
        }
        transition-all
      `}
    >
      {featured && (
        <span className="absolute top-2 left-1/2 bg-red-200 -translate-x-1/2 bg-primary text-white text-xs px-4 py-1 rounded-full">
          پیشنهاد ویژه
        </span>
      )}

      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted mb-6">{desc}</p>

      <div className="text-3xl font-bold mb-6 text-foreground">
        {price}
        {price !== "تماس بگیرید" && (
          <span className="text-sm font-normal text-muted"> تومان</span>
        )}
      </div>

      <ul className="space-y-3 mb-8 text-sm">
        {features.map((item) => (
          <li key={item} className="flex items-center gap-2 text-muted">
            <span className="text-primary">✔</span>
            {item}
          </li>
        ))}
      </ul>

      <Link
        href={`/checkout/user-info?plan=${id}`}
        className={`
          block border border-solid border-blue-900 border-2 text-center rounded-full px-6 py-3 font-medium transition
          ${
            featured
              ? "bg-primary text-white hover:opacity-90"
              : "border border-solid border-blue-900 border-2 hover:bg-background"
          }
        `}
      >
        خرید پلن
      </Link>
    </div>
  );
}
