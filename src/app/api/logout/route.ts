import { NextResponse } from "next/server";

export async function POST() {
  // پاک کردن کوکی
  const response = NextResponse.json({ message: "خارج شدید" });
  response.cookies.set("admin_token", "", { path: "/", maxAge: 0 });
  return response;
}

// اگر کسی GET بزنه، 405 برگردون
export async function GET() {
  return new NextResponse("Method Not Allowed", { status: 405 });
}
