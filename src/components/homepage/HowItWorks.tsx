"use client";

import { manropeFont } from "@/lib/fonts";
import { PencilToLine, Rocket, Eye } from "@gravity-ui/icons";
import { motion, type Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: PencilToLine,
    title: "Write Your Story",
    description:
      "Open the editor and start writing. Format with Markdown, add cover images, and save drafts anytime.",
  },
  {
    number: "02",
    icon: Rocket,
    title: "Publish Instantly",
    description:
      "One click and your post goes live. No approval queues, no waiting — your voice, out there immediately.",
  },
  {
    number: "03",
    icon: Eye,
    title: "Reach Readers",
    description:
      "Your post gets discovered through categories, search, and shares. Track views right from your dashboard.",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const HowItWorks = () => {
  return (
    <section className="relative w-full bg-white py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-sm font-semibold text-[#415A77] tracking-wide uppercase mb-3">
            How It Works
          </span>
          <h2
            className={`${manropeFont.className} text-3xl md:text-4xl font-bold text-[#0D1B2A] tracking-tight`}
          >
            From idea to published,
            <br />
            in three simple steps.
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={item}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-white rounded-3xl p-8 border border-[#778DA9]/15 shadow-[0_4px_20px_rgba(13,27,42,0.05)] hover:shadow-[0_20px_40px_rgba(13,27,42,0.12)] hover:border-[#415A77]/30 transition-shadow duration-300"
              >
                {/* Faded background number */}
                <span
                  className={`${manropeFont.className} absolute top-4 right-6 text-6xl font-bold text-[#0D1B2A]/5 group-hover:text-[#415A77]/10 transition-colors duration-300 select-none`}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0D1B2A] mb-6 group-hover:bg-[#415A77] group-hover:rotate-6 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#E0E1DD]" />
                </div>

                <h3
                  className={`${manropeFont.className} relative text-xl font-bold text-[#0D1B2A] mb-2`}
                >
                  {step.title}
                </h3>
                <p className="relative text-[#1B263B]/70 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom accent line, grows on hover */}
                <div className="mt-6 h-0.5 w-8 bg-[#415A77] rounded-full group-hover:w-16 transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
