import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function Button({ children }: Props) {
  return (
    <Link href="/checkout/confirmation" className="bg-green-200 text-white px-6 py-3 rounded-full hover:opacity-90 transition-all">
      {children}
    </Link>
  );
}
