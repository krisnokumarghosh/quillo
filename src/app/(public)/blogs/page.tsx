import AllBlogsList from '@/components/AllBlogsList';
import { getAllBlogs } from '@/lib/api/blogs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All Blogs | User",
  description: "A modern blogging platform to write and share your stories.",
};

const AllBlogsPage = async () => {
  const { blogs, total, hasMore } = await getAllBlogs({ page: 1, limit: 8 });

  return (
    <div>
      <AllBlogsList initialBlogs={blogs} initialTotal={total} initialHasMore={hasMore} />
    </div>
  );
};

export default AllBlogsPage;