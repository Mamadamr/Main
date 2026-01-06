import Link from "next/link";
import Button from "../ui/Button";
export default function HeroCTA() {
  return (
    <>
      <Link
        href="/checkout/user-info"
        className="bg-green-200 mt-7 hover:shadow-xl mb-15 p-6 rounded-xl w-50 transition-all duration-750"
      >
        شروع رایگان
      </Link>
    </>
  );
}
