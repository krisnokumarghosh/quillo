"use client";

import { Blog } from "@/lib/dataInterface";
import { manropeFont } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blogs/${blog._id}`} className="group block h-full">
      <div className="rounded-2xl overflow-hidden border border-[#778DA9]/15 bg-white hover:border-[#415A77]/30 transition-colors duration-200 h-full flex flex-col">
        <div className="relative w-full h-40">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
          <span className="absolute top-3 left-3 text-[10px] font-bold text-[#415A77] bg-white/90 px-2.5 py-1 rounded-full">
            {blog.category}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3
            className={`${manropeFont.className} text-[15px] font-bold text-[#0D1B2A] leading-snug line-clamp-2 mb-1`}
          >
            {blog.title}
          </h3>
          <p className="text-[12px] text-[#1B263B]/50 mb-3">
            by {blog.userName} · {formatDate(blog.createdAt)}
          </p>

          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#E0E1DD] bg-[#0D1B2A] group-hover:bg-[#1B263B] px-4 py-2 rounded-full transition-colors duration-200">
              Read Blog →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;