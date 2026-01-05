"use client";

import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button";

export default function ConfirmationPage() {
  const router = useRouter();

  const handleDashboard = () => {
    // هدایت به داشبورد یا منوی دیجیتال
    router.push("/plans");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary">خرید موفق!</h1>
        <p className="text-gray-700 mb-6">
          سفارش شما با موفقیت انجام شد. از پلن حرفه‌ای Sarmin لذت ببرید.
        </p>
        <div className="w-full bg-red-500" onClick={handleDashboard}>
          <Button>رفتن به داشبورد</Button>
        </div>
      </div>
    </div>
  );
}
