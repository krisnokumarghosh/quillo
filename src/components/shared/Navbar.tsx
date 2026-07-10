"use client";

import { manropeFont } from "@/lib/fonts";
import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
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
      <nav className="flex items-center justify-between px-6 py-2 md:py-3 rounded-full bg-white/80 backdrop-blur-xl backdrop-saturate-150 border border-[#778DA9]/20 shadow-[0_8px_32px_rgba(13,27,42,0.12)]">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] flex items-center justify-center">
            <span className="text-[#E0E1DD] font-bold text-sm">Q</span>
          </div>
          <span
            className={`${manropeFont.className} text-lg font-bold text-[#0D1B2A] tracking-tight`}
          >
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
        <div className="hidden md:flex items-center gap-5">
          <Link href={"/login"}>
            <Button className="border hover:bg-transparent hover:border-[#415A77] hover:text-[#415A77] bg-[#415A77] text-[#E0E1DD]">
              Login
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button className="bg-[#0D1B2A] text-[#E0E1DD] hover:bg-[#0D1B2A]/95 shadow-lg">
              Register
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Drawer>
            <Button className="bg-transparent">
              <Bars className="text-[#0D1B2A]" />
            </Button>
            <Drawer.Backdrop>
              <Drawer.Content placement="left">
                <Drawer.Dialog className=" w-50">
                  <Drawer.CloseTrigger className="bg-[#0D1B2A] text-white" />

                  <Drawer.Body>
                    <nav className="flex flex-col gap-3 h-full justify-between">
                      <div className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href}>
                              <Button
                                className={`relative bg-transparent pb-1 text-sm font-semibold transition-colors duration-200 ${
                                  isActive(link.href)
                                    ? "text-[#415A77]"
                                    : "text-[#1B263B]/70 hover:text-[#0D1B2A]"
                                }`}
                                slot="close"
                              >
                                {link.name}
                                <span
                                  className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-[#415A77] transition-transform duration-200 origin-left ${
                                    isActive(link.href)
                                      ? "scale-x-100"
                                      : "scale-x-0"
                                  }`}
                                />
                              </Button>
                            </Link>
                          </li>
                        ))}
                      </div>

                      <div className="flex flex-col  gap-5">
                        <Link href={"/login"}>
                          <Button className=" w-full hover:bg-transparent hover:border-[#415A77] hover:text-[#415A77] bg-[#415A77] text-[#E0E1DD]">
                            Login
                          </Button>
                        </Link>
                        <Link href={"/register"}>
                          <Button className="bg-[#0D1B2A] w-full text-[#E0E1DD] hover:bg-[#0D1B2A]/95 shadow-lg">
                            Register
                          </Button>
                        </Link>
                      </div>
                    </nav>
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
