import { getAllBlogs } from '@/lib/api/blogs';
import FeaturedBlogsGrid from './FeaturedBlogsGrid';

const FeaturedBlogs = async () => {
  const { blogs } = await getAllBlogs({ page: 1, limit: 3 });

  return (
    <section className="relative w-full bg-white py-15 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FeaturedBlogsGrid blogs={blogs} />
      </div>
    </section>
  );
};

export default FeaturedBlogs;