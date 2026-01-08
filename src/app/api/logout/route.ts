import { NextResponse } from "next/server";

export async function POST() {
  // اینجا باید کوکی admin_token رو پاک کنیم
  const response = NextResponse.json({ message: "خارج شدید" });

  // پاک کردن کوکی admin_token
  response.cookies.set("admin_token", "", { path: "/", maxAge: 0 });

  return response;
}
