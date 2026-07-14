import { serverFetch } from "../core/server";
import { Blog, GetAllBlogsParams, GetAllBlogsResponse } from "../dataInterface";

export const getBlogsById = async (userId: string) => {
  return serverFetch<Blog[]>(`/api/blogs/uid/${userId}`);
};


export const getAllBlogs = async ({
  search = "",
  category = "All",
  page = 1,
  limit = 8,
}: GetAllBlogsParams = {}) => {
  const params = new URLSearchParams({
    search,
    category,
    page: String(page),
    limit: String(limit),
  });

  return serverFetch<GetAllBlogsResponse>(`/api/all/blogs?${params.toString()}`);
};

export const getBlogById = async (blogId: string) => {
  return serverFetch<Blog>(`/api/blog/${blogId}`)
}