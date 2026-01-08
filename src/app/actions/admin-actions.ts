"use server";

import { cookies } from "next/headers";
import crypto from "crypto";

export async function adminLogin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email !== "amr" || password !== "Amiri") {
    throw new Error("INVALID_CREDENTIALS");
  }

  // ست کردن کوکی روی سرور
  cookies().set({
    name: "admin_token",
    value: crypto.randomUUID(),
    path: "/",
    httpOnly: true, // امنیت بیشتر
    maxAge: 60 * 60, // 1 ساعت
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function adminLogout() {
  // پاک کردن کوکی
  cookies().set({
    name: "admin_token",
    value: "",
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
