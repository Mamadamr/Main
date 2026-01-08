import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // یوزرنیم و پسورد ثابت (فعلاً)
  if (username !== "mamadaminamr" || password !== "Amirir6#@@") {
    return NextResponse.json(
      { message: "نام کاربری یا رمز عبور اشتباه است" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  // کوکی حرفه‌ای دامنه‌ای
  res.cookies.set("admin_token", "secure_admin_token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    domain: "sarminco.ir",
    maxAge: 60 * 60, // 1 ساعت
  });

  return res;
}
