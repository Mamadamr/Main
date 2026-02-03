"use server";

type OrderProduct = {
  id: string;
  name: string;
  price: number;
};

type Order = {
  id: string;
  userId: string;
  products: OrderProduct[];
  total: number;
  status: "pending" | "paid";
  createdAt: Date;
};

// آرایه موقت برای تست (بعدا دیتابیس جایگزین می‌شود)
let orders: Order[] = [];

export async function createOrder(
  userId: string,
  products: OrderProduct[],
  total: number
) {
  if (!userId || !products.length || !total) {
    throw new Error("اطلاعات سفارش کامل نیست");
  }

  const newOrder: Order = {
    id: Date.now().toString(),
    userId,
    products,
    total,
    status: "pending",
    createdAt: new Date(),
  };

  orders.push(newOrder);
  console.log("سفارش ثبت شد:", newOrder);

  return newOrder;
}

// برای گرفتن سفارش‌ها (پنل ادمین)
export async function getOrders() {
  return orders;
}
