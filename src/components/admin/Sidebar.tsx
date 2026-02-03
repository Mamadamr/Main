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
        <Link href="/admin/product" className="p-2 hover:bg-gray-200 rounded">
          محصولات
        </Link>
        <Link href="/admin/plans" className="p-2 hover:bg-gray-200 rounded">
          plans
        </Link>
        <Link href="/admin/addThings" className="p-2 hover:bg-gray-200 rounded">
          add things
        </Link>
      </nav>
    </aside>
  );
}
