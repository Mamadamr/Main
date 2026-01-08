"use server";

import { cookies } from "next/headers";

export async function adminLogin(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username !== "amr" || password !== "amirir6#@") {
    return { error: "نام کاربری یا رمز عبور اشتباه است" };
  }

  cookies().set("admin_token", "secure_admin_token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  return { success: true };
}
