import { getAllBlogs, getAllUsers } from "@/lib/api/blogs";
import StatsGrid from "./StatsGrid";

const StatsStrip = async () => {
  const [users, blogsRes] = await Promise.all([
    getAllUsers(),
    getAllBlogs(),
  ]);

  const totalBlogs = blogsRes.total;
  const totalWriters = users.length;

  const uniqueCategories = new Set(
    blogsRes.blogs.map((blog: { category: string }) => blog.category)
  );
  const totalCategories = uniqueCategories.size;

  return (
    <StatsGrid
      totalBlogs={totalBlogs}
      totalWriters={totalWriters}
      totalCategories={totalCategories}
    />
  );
};

export default StatsStrip;