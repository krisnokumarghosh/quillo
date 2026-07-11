"use client";

import { manropeFont } from "@/lib/fonts";
import { ArrowUpRight } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";

const CTABanner = () => {
  return (
    <section className="relative w-full bg-white py-15 md:py-24 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative max-w-5xl mx-auto rounded-[2.5rem] bg-[#0D1B2A] overflow-hidden px-8 py-16 md:px-16 md:py-20"
      >
        {/* Background glows */}
        <div className="absolute top-0 left-1/4 w-100 h-100 bg-[#415A77]/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-[#778DA9]/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Faint grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#E0E1DD 1px, transparent 1px), linear-gradient(90deg, #E0E1DD 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative text-center">
          <span className="inline-block text-sm font-semibold text-[#778DA9] tracking-wide uppercase mb-4">
            Join Quillo Today
          </span>

          <h2
            className={`${manropeFont.className} text-2xl md:text-5xl font-bold text-[#E0E1DD] tracking-tight leading-tight mb-6`}
          >
            Your story deserves
            <br />
            to be read.
          </h2>

          <p className="text-[#778DA9] text-base md:text-lg max-w-lg mx-auto mb-10">
            Join a growing community of writers and readers. Publish your
            first post in minutes — no complexity, just words that matter.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button className="group h-13 rounded-full bg-[#E0E1DD] hover:bg-[#E0E1DD]/90 text-[#0D1B2A] pl-6 pr-2 shadow-[0_12px_35px_rgba(0,0,0,0.25)] transition-all duration-300">
                <span className="text-base font-semibold tracking-tight">
                  Start Writing
                </span>
                <span className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0D1B2A] text-[#E0E1DD] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-6">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Button>
            </Link>

            <Link href="/blogs">
              <Button className="h-13 rounded-full bg-transparent border border-[#778DA9]/40 text-[#E0E1DD] hover:bg-white/5 hover:border-[#778DA9]/70 px-6 transition-all duration-300">
                <span className="text-base font-semibold tracking-tight">
                  Explore Blogs
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;