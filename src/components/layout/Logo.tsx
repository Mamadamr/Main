import Image from "next/image";
import Link from "next/link";
export default function logo() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Image alt="Sarmin" width={36} height={36} src="/LOGO.jpeg"></Image>
        <span className="font-bold text-lg">Sarmin</span>
      </Link>
    </div>
  );
}
