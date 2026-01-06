import Link from "next/link";

export default function Footer() {
  return (
    <div className="text-center py-6 bg-black  text-white! relative ">
      <div className="text-left p-6 flex  ">
        <ul className="block">
          <li className="p-4 text-white! w-45">
            <Link
              href="/checkout/user-info"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              Get Started
            </Link>
          </li>
          <li className="p-4 text-white! w-45">
            <Link
              href="/plans"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              Plans
            </Link>
          </li>
          <li className="p-4 text-white! w-45">
            <Link
              href="/aboutus"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              About Us
            </Link>
          </li>
          <li className="p-4 text-white! w-45">
            <Link
              href="/contact"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <ul className="">
          <li className="p-6 text-white!">
            <Link
              href="/resume"
              className="p-4 text-white! hover:m-[15px]  transition-all duration-700"
            >
              resume
            </Link>
          </li>
        </ul>
      </div>
      <div className="madarek">
        {/* <h2 className="text-white!">مدارک</h2> */}
        {/* <img src="/enamad" alt="enamad" /> */}
      </div>
      <footer className="bg-black-500 text-white! py-12 px-6 text-center">
        <p className="mb-2 text-white!">
          © {new Date().getFullYear()} Sarmin | سارمین. همه حقوق محفوظ است.
        </p>
        <p className="text-white! ">طراحی و توسعه توسط تیم سارمین</p>
      </footer>
    </div>
  );
}
