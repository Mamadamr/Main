import Link from "next/link";

export default function Footer() {
  return (
    <div className="text-center py-6 bg-black  text-white! relative ">
      Sarmin © {new Date().getFullYear()}
      <div className="text-left p-6 flex  ">
        <ul>
          <li className="p-4 text-white!">
            <Link
              href="/checkout/user-info"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              Get Started
            </Link>
          </li>
          <li className="p-4 text-white!">
            <Link
              href="/plans"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              Plans
            </Link>
          </li>
          <li className="p-4 text-white!">
            <Link
              href="/aboutus"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              About Us
            </Link>
          </li>
          <li className="p-4 text-white!">
            <Link
              href="/contact"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <ul className="ml-125">
          <li className="p-4 text-white!">
            <Link
              href="/resume"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              سایت های طراحی شده
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
}
