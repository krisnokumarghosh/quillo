import AdminBlogsList from '@/components/dashboard/admin/AdminBlogsList';
import { getAllBlogs } from '@/lib/api/blogs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All Blogs | Admin",
  description: "A modern blogging platform to write and share your stories.",
};


const Page = async () => {
  const { blogs, total, hasMore } = await getAllBlogs({ page: 1, limit: 8 });

  return (
    <div>
      <AdminBlogsList
        initialBlogs={blogs}
        initialTotal={total}
        initialHasMore={hasMore}
      />
    </div>
  );
};

export default Page;