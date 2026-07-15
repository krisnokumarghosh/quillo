"use server";

import { serverMutation } from "../core/server";
import {
  AddBlogPayload,
  AddBlogResponse,
  DeleteResponse,
} from "../dataInterface";

export const addBlog = async (data: AddBlogPayload) => {
  return serverMutation<AddBlogResponse>("/api/blog", data, "POST");
};

export const deleteBlogById = async (blogId: string) => {
  return serverMutation<DeleteResponse>(
    `/api/d/blog/${blogId}`,
    null,
    "DELETE",
  );
};

export const deleteUserById = async (userId: string) => {
  return serverMutation<DeleteResponse>(
    `/api/user/d/${userId}`,
    null,
    "DELETE",
  );
};
