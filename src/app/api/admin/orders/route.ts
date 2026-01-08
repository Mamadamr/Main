import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("admin_token")?.value;

  if (token !== process.env.ADMIN_SECRET) {
    return new Response("Forbidden", { status: 403 });
  }

  // داده‌های دمو سفارش‌ها
  const orders = [
    { id: 1, name: "سفارش 1", status: "new" },
    { id: 2, name: "سفارش 2", status: "processing" },
  ];

  return new Response(JSON.stringify(orders), { status: 200 });
}
