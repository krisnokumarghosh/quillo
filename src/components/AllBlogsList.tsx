"use client";

import { manropeFont } from "@/lib/fonts";
import { getAllBlogs } from "@/lib/api/blogs";
import { Magnifier } from "@gravity-ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import { Blog } from "@/lib/dataInterface";
import BlogCardSkeletonGrid from "./BlogCardSkeletonGrid";
import BlogCardSkeleton from "./BlogCardSkeleton";

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

const AllBlogsList = ({
  initialBlogs,
  initialTotal,
  initialHasMore,
}: {
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

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await getAllBlogs({ search, category, page: 1, limit: 8 });
      setBlogs(res.blogs);
      setTotal(res.total);
      setHasMore(res.hasMore);
      setPage(1);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, category]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextPage = page + 1;
    const res = await getAllBlogs({
      search,
      category,
      page: nextPage,
      limit: 8,
    });
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
    <div className="max-w-7xl mx-auto px-6 py-30 md:py-40">
      <h1
        className={`${manropeFont.className} text-4xl font-bold text-[#0D1B2A]`}
      >
        Explore <span className="text-[#415A77]">Blogs</span>
      </h1>
      <p className="text-sm text-[#1B263B]/60 mt-2 mb-6">
        <span className="text-[#415A77] font-semibold">{total}</span> stories
        found
      </p>

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

      {blogs.length === 0 && loading ? (
        <BlogCardSkeletonGrid count={8} />
      ) : blogs.length === 0 && !loading ? (
        <div className="text-center py-20 text-[#1B263B]/50 text-sm">
          No blogs found. Try a different search or category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}

          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <BlogCardSkeleton key={`skeleton-${i}`} />
            ))}
        </div>
      )}

      <div ref={loadMoreRef} className="flex justify-center py-10">
        {!hasMore && blogs.length > 0 && (
          <span className="text-sm text-[#1B263B]/35">
            You&apos;ve reached the end.
          </span>
        )}
      </div>
    </div>
  );
};

export default AllBlogsList;
