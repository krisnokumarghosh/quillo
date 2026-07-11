"use client"
import { manropeFont } from "@/lib/fonts";
import { ArrowRight, LogoFacebook, LogoLinkedin, LogoGithub } from "@gravity-ui/icons";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Use", href: "/terms" },
  { name: "Contact Us", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#0D1B2A] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-[#778DA9]/15">
          {/* Brand + Social */}
          <div>
            <span
              className={`${manropeFont.className} text-2xl font-bold text-[#E0E1DD]`}
            >
              Quillo
            </span>
            <p className="mt-4 text-sm text-[#778DA9] leading-relaxed max-w-xs">
              Every week we share fresh stories, writing tips, and ideas worth
              reading.
            </p>

            <p className="mt-8 text-xs font-semibold text-[#778DA9] tracking-wide uppercase mb-3">
              Follow Us
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/krisnokumarghosh"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-[#415A77]/40 transition-colors duration-200"
              >
                <LogoGithub className="w-4 h-4 text-[#E0E1DD]" />
              </Link>
              <Link
                href="https://www.facebook.com/krishnoghosh3000/"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-[#415A77]/40 transition-colors duration-200"
              >
                <LogoFacebook className="w-4 h-4 text-[#E0E1DD]" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/krisno-ghosh/"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-[#415A77]/40 transition-colors duration-200"
              >
                <LogoLinkedin className="w-4 h-4 text-[#E0E1DD]" />
              </Link>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:pl-8">
            <p className="text-xs font-semibold text-[#778DA9] tracking-wide uppercase mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#E0E1DD]/80 hover:text-[#E0E1DD] transition-colors duration-200"
                  >
                    · {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className={`${manropeFont.className} text-xl font-bold text-[#E0E1DD]`}
            >
              Subscribe to our{" "}
              <span className="italic font-serif font-normal">newsletter</span>
            </h3>
            <p className="mt-3 text-sm text-[#778DA9] leading-relaxed">
              Get the latest stories, updates, and writing tips delivered
              straight to your inbox.
            </p>

            <div className="mt-6 flex items-center gap-2 bg-white/5 border border-[#778DA9]/25 rounded-full p-1.5 pl-5">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent text-sm text-[#E0E1DD] placeholder:text-[#778DA9] outline-none"
              />
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-[#E0E1DD] text-[#0D1B2A] hover:bg-[#E0E1DD]/90 transition-colors duration-200 flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-sm">
          <p className="text-[#778DA9]">
            © 2026 Quillo. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[#E0E1DD] font-semibold hover:text-[#778DA9] transition-colors duration-200"
          >
            Back to Top
          </button>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#778DA9] hover:text-[#E0E1DD] transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Giant outline brand name */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none">
        <h1
          className={`${manropeFont.className} text-center font-bold text-[#E0E1DD]/10 leading-none whitespace-nowrap`}
          style={{ fontSize: "clamp(6rem, 18vw, 14rem)" }}
        >
          Quillo
        </h1>
      </div>
    </footer>
  );
};

export default Footer;