// app/blogs/loading.tsx

import BlogCardSkeletonGrid from "@/components/BlogCardSkeletonGrid";

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 pt-28">
      <div className="h-10 w-64 bg-[#0D1B2A]/5 rounded-lg animate-pulse mb-2" />
      <div className="h-4 w-32 bg-[#0D1B2A]/5 rounded-lg animate-pulse mb-6" />

      <div className="h-14 w-full bg-[#0D1B2A]/5 rounded-2xl animate-pulse mb-4" />

      <div className="flex gap-2 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 bg-[#0D1B2A]/5 rounded-full animate-pulse"
          />
        ))}
      </div>

      <BlogCardSkeletonGrid count={8} />
    </div>
  );
};

export default Loading;