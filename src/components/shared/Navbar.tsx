"use client";

import { manropeFont } from "@/lib/fonts";
import { ArrowRightFromSquare, ArrowUpRight, Bars } from "@gravity-ui/icons";
import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/", authRequired: false },
  { name: "Blogs", href: "/blogs", authRequired: false },
  { name: "My Posts", href: "/dashboard/user/my-blogs", authRequired: true },
  { name: "Dashboard", href: "/dashboard", authRequired: true },
  { name: "Terms", href: "/terms", authRequired: false },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const visibleLinks = navLinks
    .filter((link) => !link.authRequired || user)
    .filter(
      (link) =>
        !(link.href === "/dashboard/user/my-blogs" && user?.role === "admin"),
    )
    .map((link) =>
      link.href === "/dashboard"
        ? {
            ...link,
            href:
              user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user",
          }
        : link,
    );

  const handleLogOut = async () => {
    await authClient.signOut();
    redirect("/");
  };

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
          {visibleLinks.map((link) => (
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

        <div className="hidden md:flex">
          {isPending ? (
            <span className="text-[14px] text-[#1B263B] font-semibold mr-3">
              Loading...
            </span>
          ) : user ? (
            <div className="flex items-center gap-5">
              {user?.image ? (
                <Image
                  alt=""
                  height={35}
                  width={35}
                  src={user?.image}
                  className="rounded-full h-8.75 w-8.75 object-cover"
                />
              ) : (
                <Avatar>
                  <Avatar.Fallback>
                    {" "}
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </Avatar.Fallback>
                </Avatar>
              )}

              <Button
                onClick={handleLogOut}
                className="bg-[#0D1B2A] text-[#E0E1DD] hover:bg-[#0D1B2A]/95 shadow-lg"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
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
          )}
        </div>

        <div className="md:hidden">
          <Drawer>
            <Button className="bg-transparent">
              <Bars className="text-[#0D1B2A]" />
            </Button>
            <Drawer.Backdrop className="bg-[#0D1B2A]/40 backdrop-blur-sm">
              <Drawer.Content placement="left">
                <Drawer.Dialog className="w-72 bg-[#0D1B2A]">
                  {/* Header: Logo + Close */}
                  <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#778DA9]/15">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      slot="close"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#E0E1DD] flex items-center justify-center">
                        <span className="text-[#0D1B2A] font-bold text-sm">
                          Q
                        </span>
                      </div>
                      <span
                        className={`${manropeFont.className} text-lg font-bold text-[#E0E1DD]`}
                      >
                        Quillo
                      </span>
                    </Link>

                    <Drawer.CloseTrigger className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-[#E0E1DD] transition-colors duration-200" />
                  </div>

                  <Drawer.Body className="px-6 py-6">
                    <nav className="flex flex-col h-full justify-between">
                      {/* Nav links */}
                      <div className="flex flex-col gap-1">
                        {visibleLinks.map((link, index) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.4 }}
                          >
                            <Link href={link.href}>
                              <Button
                                slot="close"
                                className={`w-full justify-start px-3 py-3 rounded-xl text-base font-semibold transition-colors duration-200 ${
                                  isActive(link.href)
                                    ? "bg-[#415A77]/20 text-[#E0E1DD]"
                                    : "bg-transparent text-[#778DA9] hover:bg-white/5 hover:text-[#E0E1DD]"
                                }`}
                              >
                                {link.name}
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {/* Auth buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.4 }}
                        className="pb-4"
                      >
                        {isPending ? (
                          <span className="text-[14px] text-[#E0E1DD] font-semibold mr-3">
                            Loading...
                          </span>
                        ) : user ? (
                          <Button
                            onClick={handleLogOut}
                            className="group w-full h-11 rounded-full bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#0D1B2A] transition-all duration-300"
                          >
                            <span className="flex items-center justify-center gap-2">
                              Logout
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </span>
                          </Button>
                        ) : (
                          <div className="flex flex-col gap-3">
                            <Link href="/login">
                              <Button className="w-full h-11 rounded-full border border-[#778DA9]/30 bg-transparent text-[#E0E1DD] hover:bg-white/5 transition-colors duration-200">
                                Login
                              </Button>
                            </Link>
                            <Link href="/register">
                              <Button className="group w-full h-11 rounded-full bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#0D1B2A] transition-all duration-300">
                                <span className="flex items-center justify-center gap-2">
                                  Register
                                  <ArrowRightFromSquare className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </span>
                              </Button>
                            </Link>
                          </div>
                        )}
                      </motion.div>
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
