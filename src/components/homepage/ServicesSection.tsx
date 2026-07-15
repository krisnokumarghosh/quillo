"use client";

import { manropeFont } from "@/lib/fonts";
import {
  PencilToLine,
  ChartColumn,
  Magnifier,
  ArrowUpRight,
  CommentDot,
} from "@gravity-ui/icons";
import { motion } from "framer-motion";

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const gridContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const ServicesSection = () => {
  return (
    <section className="relative w-full py-16 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <motion.span
            variants={headingVariants}
            className="inline-block text-sm font-semibold text-[#415A77] tracking-wide uppercase mb-3"
          >
            What We Offer
          </motion.span>
          <motion.h2
            variants={headingVariants}
            transition={{ delay: 0.1 }}
            className={`${manropeFont.className} text-3xl md:text-4xl font-bold text-[#0D1B2A] tracking-tight`}
          >
            Everything a writer needs, nothing they don&apos;t.
          </motion.h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {/* Large featured card — Publishing */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#415A77] p-8 md:p-10 overflow-hidden flex flex-col justify-between min-h-[320px] md:min-h-[420px]"
          >
            {/* Decorative element with ambient pulse */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#778DA9] blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-6 top-6 w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center"
            >
              <PencilToLine className="w-5 h-5 text-[#E0E1DD]" />
            </motion.div>

            <div className="relative">
              <h3
                className={`${manropeFont.className} text-2xl md:text-3xl font-bold text-[#E0E1DD] tracking-tight mb-3 max-w-sm`}
              >
                Write in a space built for focus
              </h3>
              <p className="text-[#778DA9] text-[15px] leading-relaxed max-w-sm">
                A clean, distraction-free editor with autosave, formatting that
                gets out of your way, and instant preview. Draft, edit, and
                publish without ever losing your train of thought.
              </p>
            </div>

            <div className="relative flex items-center gap-2 text-sm font-semibold text-[#E0E1DD] mt-8">
              Start writing
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </motion.div>

          {/* Small card — Discovery */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group rounded-3xl bg-white border border-[#778DA9]/15 p-7 hover:border-[#415A77]/30 transition-colors duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-[#415A77]/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <Magnifier className="w-5 h-5 text-[#415A77]" />
            </div>
            <h3
              className={`${manropeFont.className} text-lg font-bold text-[#0D1B2A] mb-2`}
            >
              Get discovered
            </h3>
            <p className="text-[#1B263B]/60 text-sm leading-relaxed">
              Built-in SEO, tags, and categories put your stories in front of
              readers actively searching for them.
            </p>
          </motion.div>

          {/* Small card — Analytics */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group rounded-3xl bg-white border border-[#778DA9]/15 p-7 hover:border-[#415A77]/30 transition-colors duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-[#415A77]/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <ChartColumn className="w-5 h-5 text-[#415A77]" />
            </div>
            <h3
              className={`${manropeFont.className} text-lg font-bold text-[#0D1B2A] mb-2`}
            >
              Know your readers
            </h3>
            <p className="text-[#1B263B]/60 text-sm leading-relaxed">
              Track views, read time, and engagement on every post to see what
              actually resonates.
            </p>
          </motion.div>

          {/* Wide card — Community */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group md:col-span-2 rounded-3xl bg-[#E0E1DD]/60 border border-[#778DA9]/15 p-7 hover:border-[#415A77]/30 transition-colors duration-300 flex items-center gap-6"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#0D1B2A]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <CommentDot className="w-5 h-5 text-[#415A77]" />
            </div>
            <div>
              <h3
                className={`${manropeFont.className} text-lg font-bold text-[#0D1B2A] mb-1`}
              >
                Build real conversations
              </h3>
              <p className="text-[#1B263B]/60 text-sm leading-relaxed">
                Comments, replies, and reactions turn every post into a two-way
                conversation with your readers.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
