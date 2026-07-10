"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl">
      <nav className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-xl backdrop-saturate-150 border border-[#778DA9]/20 shadow-[0_8px_32px_rgba(13,27,42,0.12)]">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] flex items-center justify-center">
            <span className="text-[#E0E1DD] font-bold text-sm">Q</span>
          </div>
          <span className="text-lg font-semibold text-[#0D1B2A] tracking-tight">
            Quillo
          </span>
        </Link>

        {/* Center Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative pb-1 text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-[#415A77]"
                    : "text-[#1B263B]/70 hover:text-[#0D1B2A]"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-[#415A77] transition-transform duration-200 origin-left ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Links */}
        <div className="flex items-center gap-5">
         <Link href={"/login"}>
         <Button className="border bg-transparent border-[#415A77] text-[#415A77] hover:bg-[#415A77] hover:text-[#E0E1DD]">
            Login
         </Button>
         </Link>
         <Link href={"/register"}>
         <Button className="bg-[#0D1B2A] text-[#E0E1DD] hover:bg-[#415A77] shadow-lg">
            Register
         </Button>
         </Link>
          
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
