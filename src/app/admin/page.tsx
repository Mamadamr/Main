import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default function AdminPage() {
  const token = cookies().get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
