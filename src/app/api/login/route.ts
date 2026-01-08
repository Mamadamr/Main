import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { username, password } = data;

    // Validate username (نباید ایمیل باشه)
    if (!username || username.includes("@")) {
      return NextResponse.json(
        { error: "نام کاربری معتبر نیست" },
        { status: 400 }
      );
    }

    // مثال اعتبارسنجی ساده (باید با DB جایگزین بشه)
    if (username === "admin" && password === "123456") {
      const res = NextResponse.json({ success: true });

      // ست کردن کوکی روی دامنه واقعی
      res.cookies.set({
        name: "admin_token",
        value: "secure_admin_token_here",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        domain: "sarminco.ir",
        maxAge: 60 * 60, // 1 ساعت
      });

      return res;
    }

    return NextResponse.json(
      { error: "نام کاربری یا رمز عبور اشتباه است" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
