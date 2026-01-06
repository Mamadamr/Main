"use client"
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";

export default function Header() {
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
     const handleScroll = () => setScrolled(window.scrollY > 10);
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all ${
        scrolled ? "shadow-xl py-3" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 text-sm">
          <NavLinks />
        </nav>

        {/* Mobile menu */}
        <MobileMenu />
      </div>
      
    </header>
  );
}
