"use client";

import { manropeFont } from "@/lib/fonts";
import { getAllBlogs } from "@/lib/api/blogs";
import {  Calendar } from "@gravity-ui/icons";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Blog } from "@/lib/dataInterface";
import BlogDeleteAlert from "../BlogDeleteAlert";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const BlogCard = ({ blog }: { blog: Blog }) => {
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
            <span className="truncate">by {blog.userName}</span>
            <span>·</span>
            <span className="flex items-center gap-1 flex-none">
              <Calendar width={12} height={12} />
              {formatDate(blog.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <BlogDeleteAlert blog={blog}/>
    </div>
  );
};

const BlogListSkeleton = () => (
  <div className="flex items-center justify-between gap-4 bg-white border border-[#778DA9]/15 rounded-2xl p-4 animate-pulse">
    <div className="flex items-center gap-4 min-w-0 flex-1">
      <div className="w-14 h-14 rounded-xl bg-[#0D1B2A]/5 flex-none" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 w-2/5 bg-[#0D1B2A]/5 rounded-lg" />
        <div className="h-3 w-1/4 bg-[#0D1B2A]/5 rounded-lg" />
      </div>
    </div>
    <div className="h-9 w-24 bg-[#0D1B2A]/5 rounded-full flex-none" />
  </div>
);

const AdminBlogsList = ({
  initialBlogs,
  initialTotal,
  initialHasMore,
}: {
  initialBlogs: Blog[];
  initialTotal: number;
  initialHasMore: boolean;
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false); 
  const hasMoreRef = useRef(hasMore);
  const pageRef = useRef(page);

  useEffect(() => {
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    pageRef.current = page;
  }, [loading, hasMore, page]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return; 
    loadingRef.current = true;
    setLoading(true);

    const nextPage = pageRef.current + 1;
    const res = await getAllBlogs({ page: nextPage, limit: 8 });

    setBlogs((prev) => {
      const existingIds = new Set(prev.map((b) => b._id));
      const newUnique = res.blogs.filter((b) => !existingIds.has(b._id)); 
      return [...prev, ...newUnique];
    });

    setHasMore(res.hasMore);
    setPage(nextPage);
    setLoading(false);
    loadingRef.current = false;
  }, []); 

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMore]); 
  

  return (
    <div className="p-3 ">
      <h1
        className={`${manropeFont.className} text-3xl  font-bold text-[#0D1B2A]`}
      >
        All <span className="text-[#415A77]">Blogs</span>
      </h1>
      <p className="text-sm text-[#1B263B]/60 mt-1 mb-6">
        <span className="text-[#415A77] font-semibold">{initialTotal}</span>{" "}
        blogs published across the platform
      </p>

      {blogs.length === 0 ? (
        <div className="text-center py-16 text-[#1B263B]/50 text-sm">
          No blogs found.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
          {loading && (
            <>
              <BlogListSkeleton />
              <BlogListSkeleton />
            </>
          )}
        </div>
      )}

      <div ref={loadMoreRef} className="flex justify-center py-8">
        {!hasMore && blogs.length > 0 && (
          <span className="text-sm text-[#1B263B]/35">
            You&apos;ve reached the end.
          </span>
        )}
      </div>
    </div>
  );
};
export default AdminBlogsList;
