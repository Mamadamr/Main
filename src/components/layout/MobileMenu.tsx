"use client";

import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { useSwipeable } from "react-swipeable"; // npm i react-swipeable

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // قفل اسکرول بدن
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // بستن با ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // swipe handler
  const handlers = useSwipeable({
    onSwipedRight: () => setOpen(false),
    trackMouse: true,
  });

  return (
    <>
      {/* Hamburger فقط موبایل */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex flex-col gap-1 z-50 relative"
        aria-label="Open menu"
      >
        <span className="w-6 h-0.5 bg-gray-800" />
        <span className="w-6 h-0.5 bg-gray-800" />
        <span className="w-6 h-0.5 bg-gray-800" />
      </button>

      {open && (
        <>
          {/* Overlay با blur */}
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* Drawer با انیمیشن iOS */}
          <aside
            {...handlers}
            dir="ltr"
            className={` absolute -right-10 top-0  h-100000 w-72 overflow-hidden!  bg-white z-50
              transform transition-transform duration-300 ease-out
              ${open ? "-translate-x-10" : "left-1000"}`}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <span className="font-bold text-lg">Sarmin</span>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-2xl z-50 relative "
              >
                ×
              </button>
            </div>

            <nav
              className="flex bg-gray-300 relative -top-[13px] flex-col rounded-b-xl  gap-6 p-9 text-sm"
              onClick={() => setOpen(false)}
            >
              <NavLinks />
            </nav>
          </aside>
        </>
      )}
    </>
  );
}
