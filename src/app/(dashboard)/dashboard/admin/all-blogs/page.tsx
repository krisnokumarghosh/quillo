import AdminBlogsList from '@/components/dashboard/admin/AdminBlogsList';
import { getAllBlogs } from '@/lib/api/blogs';

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