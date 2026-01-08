import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { username, password } = data;

  // اعتبارسنجی ساده، میتونی دیتابیس بزاری
  if (username === "admin@sarminco.ir" && password === "Amirir6#@@") {
    const res = NextResponse.json({ message: "ورود موفق" });

    // تنظیم HttpOnly Cookie
    res.cookies.set({
      name: "admin_token",
      value: "super-secret-token",
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24, // یک روز
      sameSite: "lax",
    });

    return res;
  } else {
    return NextResponse.json(
      { message: "نام کاربری یا رمز اشتباه است" },
      { status: 401 }
    );
  }
}
