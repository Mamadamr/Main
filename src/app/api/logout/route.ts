// src/app/admin/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect("/admin/login?success=خروج+موفقیت‌آمیز");
  response.cookies.set({
    name: "admin_token",
    value: "",
    path: "/",
    maxAge: 0,
    domain: "sarminco.ir",
    httpOnly: true,
    sameSite: "lax",
  });
  return response;
}

