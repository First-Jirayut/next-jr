"use client";
import React from "react";
import Link from "next/link";
import {useState} from "react";
const NAVS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/menu", label: "เมนู" },
  { href: "/order", label: "สั่งซื้อ" },
  { href: "/crypto/crypto-price", label: "Stock" },
  { href: "/contact", label: "ติดต่อเรา" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="backdrop-blur bg-gradient-to-r from-blue-800/90 via-indigo-800/90 to-blue-700/80 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link href="/" className="flex items-center gap-2 text-white text-2xl font-extrabold tracking-wide drop-shadow">
          <span className="text-3xl">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="#F9D8A7"/>
              <circle cx="16" cy="16" r="10" fill="#F7B4C0"/>
              <circle cx="16" cy="16" r="4" fill="#fff"/>
              <ellipse cx="10" cy="14" rx="1" ry="2" fill="#fff"/>
              <ellipse cx="22" cy="18" rx="1" ry="2" fill="#fff"/>
            </svg>
          </span> บ้านขนมหวาน ( By Jirayut )
        </Link>
        {/* Desktop menu */}
        <div className="hidden md:flex gap-2">
          {NAVS.map((nav) => (
            <Link
              key={nav.href}
              href={nav.href}
              className="px-4 py-2 rounded-lg font-medium text-white/90 hover:text-white hover:bg-blue-600/80 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 relative"
            >
              {nav.label}
              {nav.label === "Stock" && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-pulse text-[8px]">
                  NEWS
                </span>
              )}
            </Link>
          ))}
        </div>
        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-white/70 text-white"
          aria-label="เปิดเมนู"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            // Close icon
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            // Hamburger icon
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
          )}
        </button>
      </div>
      {/* Mobile menu popover */}
      {open && (
        <div className="md:hidden bg-gradient-to-r from-blue-800/90 via-indigo-800/90 to-blue-700/80 px-4 pb-4 pt-2 rounded-b-xl shadow-lg animate-fadeIn z-50">
          <div className="flex flex-col gap-2">
            {NAVS.map((nav) => (
              <Link
                key={nav.href}
                href={nav.href}
                className="block px-4 py-2 rounded-lg font-medium text-white/90 hover:text-white hover:bg-blue-600/80 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 relative"
                onClick={() => setOpen(false)}
              >
                {nav.label}
                {nav.label === "Stock" && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                    NEWS
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
