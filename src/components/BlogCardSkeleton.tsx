import { Skeleton } from "@heroui/react";

const BlogCardSkeleton = () => {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#778DA9]/15 bg-white h-full flex flex-col">
      {/* Thumbnail */}
      <Skeleton
        animationType="shimmer"
        className="w-full h-40 rounded-none"
      />

      <div className="p-4 flex flex-col flex-1 gap-2.5">
        {/* Title — 2 lines */}
        <Skeleton animationType="shimmer" className="h-4 w-full rounded-lg" />
        <Skeleton animationType="shimmer" className="h-4 w-3/5 rounded-lg" />

        {/* Meta line (author · date) */}
        <Skeleton animationType="shimmer" className="h-3 w-2/5 rounded-lg mt-1" />

        {/* Button */}
        <div className="mt-auto pt-2">
          <Skeleton animationType="shimmer" className="h-8 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;