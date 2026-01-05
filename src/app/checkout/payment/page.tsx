"use client";

import { useRouter } from "next/navigation";
import Button from "../../../components/ui/Button";

export default function PaymentPage() {
  const router = useRouter();

  const handlePayment = () => {
    // اینجا می‌تونی اتصال به درگاه بانکی یا API پرداخت واقعی بزنی
    // بعد از موفقیت، هدایت به صفحه تایید
    router.push("/checkout/confirmation");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-16 bg-white rounded-2xl my-60 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">پرداخت پلن</h1>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700 mb-2">
          پلن انتخابی: <span className="font-semibold">پلن حرفه‌ای</span>
        </p>
        <p className="text-gray-700 mb-2">
          مبلغ قابل پرداخت: <span className="font-bold text-lg">49$ / ماه</span>
        </p>
      </div>

      <div
        className="space-y-4 w-full text-center bg-green-300 rounded-xl"
        onClick={handlePayment}
      >
        <Button >پرداخت امن</Button>
      </div>
    </div>
  );
}
