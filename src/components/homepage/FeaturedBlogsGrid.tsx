"use client";

import { manropeFont } from "@/lib/fonts";
import type { Blog } from "@/lib/dataInterface";
import { ArrowUpRight } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import BlogCard from "../BlogCard";

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

const FeaturedBlogsGrid = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-12"
      >
        <div>
          <span className="inline-block text-sm font-semibold text-[#415A77] tracking-wide uppercase mb-3">
            Featured Stories
          </span>
          <h2
            className={`${manropeFont.className} text-3xl md:text-4xl font-bold text-[#0D1B2A] tracking-tight`}
          >
            Fresh from our writers.
          </h2>
        </div>

        <Link
          href="/blogs"
          className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#415A77] hover:text-[#0D1B2A] transition-colors duration-200 flex-none"
        >
          View all blogs
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {blogs.map((blog) => (
          <motion.div key={blog._id} variants={item}>
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default FeaturedBlogsGrid;