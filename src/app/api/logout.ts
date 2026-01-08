// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // پاک کردن کوکی HttpOnly
  res.setHeader(
    "Set-Cookie",
    "admin_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax"
  );

  return res.status(200).json({ message: "خارج شدید" });
}
