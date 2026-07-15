"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Cpu,
  Palette,
  ListCheck,
  Pulse,
  Briefcase,
  Book,
  Layers,
  ChevronDown,
  Plane,
} from "@gravity-ui/icons";
import { manropeFont } from "@/lib/fonts";


const INK = "#0D1B2A";
const NAVY = "#1B263B";
const SLATE = "#415A77";
const MIST = "#778DA9";
const PAPER = "#E0E1DD";

type Category = {
  name: string;
  slug: string;
  description: string;
  icon: typeof Cpu;
  color: string;
};

const CATEGORIES: Category[] = [
  {
    name: "Technology",
    slug: "technology",
    description: "Code, tools, and the machines shaping tomorrow.",
    icon: Cpu,
    color: INK,
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Everyday living, done a little better.",
    icon: Palette,
    color: NAVY,
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Maps, routes, and reasons to leave home.",
    icon: Plane,
    color: SLATE,
  },
  {
    name: "Productivity",
    slug: "productivity",
    description: "Systems and habits that actually stick.",
    icon: ListCheck,
    color: MIST,
  },
  {
    name: "Health",
    slug: "health",
    description: "Body, mind, and the space between.",
    icon: Pulse,
    color: NAVY,
  },
  {
    name: "Business",
    slug: "business",
    description: "Strategy, growth, and the numbers behind it.",
    icon: Briefcase,
    color: SLATE,
  },
  {
    name: "Education",
    slug: "education",
    description: "Lessons worth learning twice.",
    icon: Book,
    color: INK,
  },
  {
    name: "Other",
    slug: "other",
    description: "Everything that didn't fit a shelf.",
    icon: Layers,
    color: MIST,
  },
];

export default function CategoriesSection() {
  return (
    <section className="w-full px-6 py-8 md:py-24 ">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <span
              className="inline-block text-sm font-semibold text-[#415A77] tracking-wide uppercase mb-3"
              style={{ color: SLATE }}
            >
              Reading shelf
            </span>
            <h2
              className={`${manropeFont.className} text-3xl md:text-4xl font-bold text-[#0D1B2A] tracking-tight`}
              style={{ color: INK }}
            >
              Pick a shelf,
              <br />
              start reading.
            </h2>
          </div>
        </div>

        <DesktopShelf />
        <MobileAccordion />
      </div>
    </section>
  );
}


function DesktopShelf() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="hidden h-110 gap-3 md:flex" role="list">
      {CATEGORIES.map((cat, i) => {
        const isActive = active === i;
        const Icon = cat.icon;

        return (
          <motion.button
            key={cat.slug}
            role="listitem"
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            initial={{ flex: 1, opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            animate={{ flex: isActive ? 5 : 1 }}
            transition={{
              flex: reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 210, damping: 28 },
              opacity: { duration: 0.4, delay: i * 0.05 },
              y: { duration: 0.4, delay: i * 0.05 },
            }}
            className="relative min-w-16 overflow-hidden rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              backgroundColor: cat.color,
              // @ts-expect-error -- css var for focus ring color
              "--tw-ring-color": PAPER,
            }}
          >
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-between py-8 pointer-events-none"
              animate={{ opacity: isActive ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            >
              <Icon width={22} height={22} style={{ color: PAPER }} />
              <span
                className="font-serif text-lg tracking-wide whitespace-nowrap"
                style={{
                  color: PAPER,
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {cat.name}
              </span>
            </motion.div>

            <motion.div
              className="absolute inset-0 flex flex-col justify-between p-7"
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.25, delay: isActive ? 0.12 : 0 }}
              style={{ pointerEvents: isActive ? "auto" : "none" }}
            >
              <div className="flex items-center justify-between">
                <Icon width={26} height={26} style={{ color: PAPER }} />
              </div>

              <div>
                <h3
                  className="font-serif text-2xl leading-snug"
                  style={{ color: PAPER }}
                >
                  {cat.name}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed opacity-80"
                  style={{ color: PAPER }}
                >
                  {cat.description}
                </p>
              </div>
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ---- Mobile: tap-to-expand accordion -----------------------------------
function MobileAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3 md:hidden" role="list">
      {CATEGORIES.map((cat, i) => {
        const isOpen = open === i;
        const Icon = cat.icon;

        return (
          <motion.div
            key={cat.slug}
            role="listitem"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="overflow-hidden rounded-2xl"
            style={{ backgroundColor: cat.color }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 p-5 text-left outline-none"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                <Icon width={20} height={20} style={{ color: PAPER }} />
                <span className="font-serif text-lg" style={{ color: PAPER }}>
                  {cat.name}
                </span>
              </span>
              <span className="flex items-center gap-3">
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown
                    width={18}
                    height={18}
                    style={{ color: PAPER }}
                  />
                </motion.span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-5"
                >
                  <p
                    className="pb-5 text-sm leading-relaxed opacity-80"
                    style={{ color: PAPER }}
                  >
                    {cat.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
