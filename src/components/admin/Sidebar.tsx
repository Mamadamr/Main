import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen shadow-md">
      <div className="p-6 font-bold text-xl">Admin Panel</div>
      <nav className="flex flex-col mt-4 gap-2">
        <Link href="/admin" className="p-2 hover:bg-gray-200 rounded">
          داشبورد
        </Link>
        <Link href="/admin/orders" className="p-2 hover:bg-gray-200 rounded">
          سفارشات
        </Link>
        <Link href="/admin/settings" className="p-2 hover:bg-gray-200 rounded">
          تنظیمات سایت
        </Link>
        <Link href="/admin/admins" className="p-2 hover:bg-gray-200 rounded">
          ادمین‌ها
        </Link>
      </nav>
    </aside>
  );
}
