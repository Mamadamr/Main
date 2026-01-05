
import Link from "next/link";

export default function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <Link
        href="/plans"
        onClick={onClick}
        className="hover:text-primary text-black-200! font-bold text-2xl"
      >
        پلن‌ها
      </Link>
      
      <Link
        href="/contact"
        onClick={onClick}
        className="hover:text-primary text-black-200! font-bold text-2xl"
      >
        تماس با ما
      </Link>
      <Link
        href="/aboutus/"
        onClick={onClick}
        className="hover:text-primary text-black-200! font-bold text-2xl"
      >
       درباره ما
      </Link>
    </>
  );
}
