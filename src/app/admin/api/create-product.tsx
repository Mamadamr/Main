"use server";
import { db } from "@/lib/prisma";
export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const image = formData.get("image");
  await db.execute(
    "insert into product (titlr , description , price , image) VALUES (?,?,?,?)",
    [title, description, price, image]
  );
}
