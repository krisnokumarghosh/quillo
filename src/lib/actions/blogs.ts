"use server";

import { serverMutation } from "../core/server";
import {
  AddBlogPayload,
  AddBlogResponse,
  DeleteBlogResponse,
} from "../dataInterface";

export const addBlog = async (data: AddBlogPayload) => {
  return serverMutation<AddBlogResponse>("/api/blog", data, "POST");
};

export const deleteBlogById = async (blogId: string) => {
  return serverMutation<DeleteBlogResponse>(
    `/api/d/blog/${blogId}`,
    null,
    "DELETE",
  );
};
