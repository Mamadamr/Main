// src/app/admin/page.tsx
import AdminDashboardClient from "./AdminDashboardClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminDashboardPage() {
  const token = cookies().get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login?error=ابتدا+وارد+شوید");
  }

  // فقط رندر Client Component
  return <AdminDashboardClient />;
}
