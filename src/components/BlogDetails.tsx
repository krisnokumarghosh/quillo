import { Blog } from "@/lib/dataInterface";
import { manropeFont } from "@/lib/fonts";
import { Calendar, ArrowLeft } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const getReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const BlogDetails = ({ blog }: { blog: Blog }) => {
  return (
    <article className="bg-white min-h-screen">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pt-28 md:pt-40 pb-4 ">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B263B]/60 hover:text-[#0D1B2A] transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pb-8">
        <span className="inline-block text-xs font-bold text-[#415A77] bg-[#415A77]/10 px-3 py-1 rounded-full mb-4">
          {blog.category}
        </span>

        <h1
          className={`${manropeFont.className} text-3xl md:text-5xl font-bold text-[#0D1B2A] tracking-tight leading-[1.15] mb-5`}
        >
          {blog.title}
        </h1>

        <p className="text-base text-[#1B263B]/60 leading-relaxed mb-6">
          {blog.description}
        </p>

        {/* Author + meta */}
        <div className="flex items-center gap-3 pb-6 border-b border-[#778DA9]/15">
          <div className="w-10 h-10 rounded-full bg-[#415A77]/15 flex items-center justify-center flex-none">
            <span
              className={`${manropeFont.className} text-[#415A77] text-sm font-bold`}
            >
              {blog.userName?.[0]?.toUpperCase() ?? "U"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0D1B2A]">
              {blog.userName}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#1B263B]/50">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(blog.createdAt)}</span>
              <span>·</span>
              <span>{getReadTime(blog.content)} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <div className="relative w-full h-56 md:h-105 rounded-3xl overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <div className="prose-content text-[16px] leading-[1.9] text-[#1B263B] whitespace-pre-line">
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-10 pt-8 border-t border-[#778DA9]/15">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className={`${manropeFont.className} text-xs font-semibold text-[#415A77] bg-[#415A77]/10 px-3 py-1.5 rounded-full`}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogDetails;