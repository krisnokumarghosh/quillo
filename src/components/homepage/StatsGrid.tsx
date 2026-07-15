"use client";

import { manropeFont } from "@/lib/fonts";
import {
  BookOpen,
  Persons,
  PencilToLine,
  Layers,
} from "@gravity-ui/icons";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatsGridProps = {
  totalBlogs: number;
  totalWriters: number;
  totalCategories: number;
  monthlyReaders?: number;
};

const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
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

const StatsGrid = ({
  totalBlogs,
  totalWriters,
  totalCategories,
  monthlyReaders,
}: StatsGridProps) => {
  const stats = [
    { icon: BookOpen, value: totalBlogs, suffix: "+", label: "Stories Published" },
    {
      icon: Persons,
      value: monthlyReaders ?? totalWriters * 40,
      suffix: "+",
      label: "Monthly Readers",
    },
    { icon: PencilToLine, value: totalWriters, suffix: "+", label: "Active Writers" },
    { icon: Layers, value: totalCategories, suffix: "", label: "Categories Covered" },
  ];

  return (
    <section className="relative w-full py-15 md:py-28 px-6">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#415A77] tracking-wide uppercase mb-3">
            By The Numbers
          </span>
          <h2
            className={`${manropeFont.className} text-2xl md:text-4xl font-bold text-[#0D1B2A] tracking-tight`}
          >
            Growing every single day.
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-[#0D1B2A]/3 rounded-3xl p-6 md:p-8 border border-[#778DA9]/15 hover:border-[#415A77]/30 hover:bg-[#0D1B2A]/5 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#0D1B2A]/10 mb-5 group-hover:bg-[#415A77]/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[#415A77] group-hover:text-[#0D1B2A] transition-colors duration-300" />
                </div>

                <div
                  className={`${manropeFont.className} flex items-baseline text-3xl md:text-4xl font-bold text-[#0D1B2A] tracking-tight`}
                >
                  <Counter value={stat.value} />
                  <span className="text-[#778DA9]">{stat.suffix}</span>
                </div>
                <p className="mt-2 text-sm text-[#1B263B]/70 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsGrid;