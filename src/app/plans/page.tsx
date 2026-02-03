import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description: string | null;
  category_id: number | null;
  price: string;
  stock: number | null;
  status: string | null;
  created_at?: string;
  updated_at?: string;
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:9000/api/products", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.error("Products request failed:", res.status, res.statusText);
      return [];
    }

    const payload = await res.json();

    if (payload?.data && Array.isArray(payload.data)) {
      return payload.data;
    }

    console.warn("Unexpected products payload:", payload);
    return [];
  } catch (error) {
    console.error("Products fetch error:", error);
    return [];
  }
}

function formatPrice(price: string) {
  const numericPrice = Number.parseFloat(price);
  if (Number.isNaN(numericPrice)) return price;
  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
    maximumFractionDigits: 0,
  }).format(numericPrice);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white text-white! py-16 px-4">
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl text-slate-950! md:text-5xl font-bold drop-shadow-lg">
          پلن‌های خرید
        </h1>
        <p className="drop-shadow-lg text-slate-950!!">
          پلن‌های موجود را بررسی کنید و گزینه مناسب خود را انتخاب نمایید.
        </p>
      </section>

      <section className="mt-12 grid gap-8 grid-cols-1 text-white! md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
        {products.length === 0 && (
          <p className="col-span-full text-center text-white! drop-shadow-lg">
            محصولی برای نمایش موجود نیست.
          </p>
        )}

        {products.map((product) => (
          <article
            key={product.id}
            className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 shadow-2xl shadow-black/40 flex flex-col"
          >
            <header className="space-y-2">
              <h2 className="text-2xl font-semibold text-white!">
                {product.title}
              </h2>
              {product.status && (
                <span className="text-xs uppercase tracking-wide text-white/80!">
                  وضعیت: {product.status}
                </span>
              )}
              {product.description && (
                <p className="text-sm text-white/90! leading-relaxed">
                  {product.description}
                </p>
              )}
            </header>

            <div className="mt-6 text-3xl font-bold text-white!">
              {formatPrice(product.price)}
            </div>

            <div className="text-center w-full pt-8">
              <Link
                href="/contactus"
                className="block w-full rounded-2xl bg-indigo-500 py-3 text-sm font-semibold text-white! transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                انتخاب این پلن
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
