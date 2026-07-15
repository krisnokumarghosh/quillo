"use client";

import { manropeFont } from "@/lib/fonts";
import {
  ArrowRight,
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";
import { motion } from "framer-motion";
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
  
];

const socialLinks = [
  { icon: LogoGithub, href: "https://github.com/krisnokumarghosh" },
  { icon: LogoFacebook, href: "https://www.facebook.com/krishnoghosh3000/" },
  { icon: LogoLinkedin, href: "https://www.linkedin.com/in/krisno-ghosh/" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#0D1B2A] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-[#778DA9]/15"
        >
          {/* Brand + Social */}
          <motion.div variants={item}>
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
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-[#415A77]/40 transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 text-[#E0E1DD]" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Nav Links */}
          <motion.div variants={item} className="md:pl-8">
            <p className="text-xs font-semibold text-[#778DA9] tracking-wide uppercase mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-[#E0E1DD]/80 hover:text-[#E0E1DD] transition-colors duration-200"
                  >
                    <span className="mr-1.5 transition-transform duration-200 group-hover:translate-x-1">
                      ·
                    </span>
                    <span className="relative">
                      {link.name}
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#E0E1DD] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={item}>
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

            <div className="mt-6 flex items-center gap-2 bg-white/5 border border-[#778DA9]/25 rounded-full p-1.5 pl-5 focus-within:border-[#778DA9]/60 transition-colors duration-200">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent text-sm text-[#E0E1DD] placeholder:text-[#778DA9] outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.08, rotate: 45 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#E0E1DD] text-[#0D1B2A] shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-sm"
        >
          <p className="text-[#778DA9]">© 2026 Quillo. All rights reserved.</p>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[#E0E1DD] font-semibold hover:text-[#778DA9] transition-colors duration-200"
          >
            Back to Top
          </motion.button>

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
        </motion.div>
      </div>

      {/* Giant outline brand name */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative w-full overflow-hidden select-none pointer-events-none"
      >
        <h1
          className={`${manropeFont.className} text-center font-bold text-[#E0E1DD]/10 leading-none whitespace-nowrap`}
          style={{ fontSize: "clamp(6rem, 18vw, 14rem)" }}
        >
          Quillo
        </h1>
      </motion.div>
    </footer>
  );
};

export default Footer;
