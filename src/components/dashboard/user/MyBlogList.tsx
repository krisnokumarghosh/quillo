"use client";

import { manropeFont } from "@/lib/fonts";
import { Eye, TrashBin, Calendar } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import BlogDeleteAlert from "../BlogDeleteAlert";
import { Blog } from "@/lib/dataInterface";



const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const BlogCard = ({
  blog,
 
}: {
  blog: Blog;
  
}) => {
  return (
    <div className="flex items-center justify-between gap-4 bg-white border border-[#778DA9]/15 rounded-2xl p-4 hover:border-[#415A77]/30 transition-colors duration-200">
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-none border border-[#778DA9]/15">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              className={`${manropeFont.className} text-[15px] font-bold text-[#0D1B2A] truncate`}
            >
              {blog.title}
            </h3>
            <span className="text-[11px] font-bold text-[#415A77] bg-[#415A77]/10 px-2 py-0.5 rounded-full flex-none">
              {blog.category}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-[#1B263B]/50">
            <Calendar width={12} height={12} />
            <span>Published {formatDate(blog.createdAt)}</span>
            {blog.tags.length > 0 && (
              <>
                <span>·</span>
                <span className="truncate">
                  {blog.tags.map((t) => `#${t}`).join(" ")}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-none">
        <Link href={`/blogs/${blog._id}`}>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-[#1B263B]/70 bg-[#0D1B2A]/5 hover:bg-[#0D1B2A]/10 transition-colors duration-200">
            <Eye width={14} height={14} />
            View
          </button>
        </Link>
        <BlogDeleteAlert blog={blog}/>
      </div>
    </div>
  );
};

const MyBlogsList = ({ blogs }: { blogs: Blog[] }) => {
 

  return (
    <div>
      <h1
        className={`${manropeFont.className} text-3xl font-bold text-[#0D1B2A]`}
      >
        My <span className="text-[#415A77]">Blogs</span>
      </h1>
      <p className="text-sm text-[#1B263B]/60 mt-1 mb-6">
        Manage and track all your published stories.
      </p>

      {blogs.length === 0 ? (
        <div className="text-center py-16 text-[#1B263B]/50 text-sm">
          You haven&apos;t written any blogs yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog}  />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogsList;