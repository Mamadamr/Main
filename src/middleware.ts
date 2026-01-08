import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  // اگر مسیر /admin باشه ولی توکن نیست => ریدایرکت به دامنه اصلی
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect("https://sarminco.ir/login");
  }

  // اگر توکن هست و مسیر login => ریدایرکت به /admin
  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect("https://sarminco.ir/admin");
  }

  return NextResponse.next();
}

// مسیرهایی که middleware روی آن‌ها اعمال شود
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
