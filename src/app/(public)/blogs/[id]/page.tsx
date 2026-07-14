import BlogDetails from "@/components/BlogDetails";
import { getBlogById } from "@/lib/api/blogs";
import { Props } from "@/lib/dataInterface";

const BlogDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const blog = await getBlogById(id);

  return (
    <div>
      <BlogDetails blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
