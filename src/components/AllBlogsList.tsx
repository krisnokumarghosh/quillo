"use client";

import { manropeFont } from "@/lib/fonts";
import { getAllBlogs } from "@/lib/api/blogs";
import { Magnifier } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Blog } from "@/lib/dataInterface";

const CATEGORIES = [
  "All",
  "Technology",
  "Lifestyle",
  "Travel",
  "Productivity",
  "Health",
  "Business",
  "Education",
  "Other",
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Link href={`/blogs/${blog._id}`} className="group block">
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

const AllBlogsList = ({ initialBlogs, initialTotal, initialHasMore }: {
  initialBlogs: Blog[];
  initialTotal: number;
  initialHasMore: boolean;
}) => {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [total, setTotal] = useState(initialTotal);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Search/category change hole reset kore prothom page theke নতুন fetch
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await getAllBlogs({ search, category, page: 1, limit: 8 });
      setBlogs(res.blogs);
      setTotal(res.total);
      setHasMore(res.hasMore);
      setPage(1);
      setLoading(false);
    }, 400); // debounce, typing থামলে 400ms পর fetch hবে

    return () => clearTimeout(timeout);
  }, [search, category]);

  // Infinite scroll — next page load kore existing blogs-e append kore
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;
    const res = await getAllBlogs({ search, category, page: nextPage, limit: 8 });
    setBlogs((prev) => [...prev, ...res.blogs]);
    setHasMore(res.hasMore);
    setPage(nextPage);
    setLoading(false);
  }, [loading, hasMore, page, search, category]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loadMore]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <h1 className={`${manropeFont.className} text-4xl font-bold text-[#0D1B2A]`}>
        Explore <span className="text-[#415A77]">Blogs</span>
      </h1>
      <p className="text-sm text-[#1B263B]/60 mt-2 mb-6">
        <span className="text-[#415A77] font-semibold">{total}</span> stories found
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Magnifier className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#778DA9]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, tags, or category..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#0D1B2A]/3 border border-[#778DA9]/20 text-sm text-[#0D1B2A] placeholder:text-[#1B263B]/35 outline-none focus:border-[#415A77] transition-colors duration-200"
        />
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors duration-200 ${
              category === cat
                ? "bg-[#0D1B2A] text-[#E0E1DD]"
                : "bg-[#0D1B2A]/5 text-[#1B263B]/60 hover:bg-[#0D1B2A]/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {blogs.length === 0 && !loading ? (
        <div className="text-center py-20 text-[#1B263B]/50 text-sm">
          No blogs found. Try a different search or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {/* Infinite scroll trigger + loading indicator */}
      <div ref={loadMoreRef} className="flex justify-center py-10">
        {loading && (
          <span className="text-sm text-[#1B263B]/50">Loading more blogs...</span>
        )}
        {!hasMore && blogs.length > 0 && (
          <span className="text-sm text-[#1B263B]/35">You&apos;ve reached the end.</span>
        )}
      </div>
    </div>
  );
};

export default AllBlogsList;