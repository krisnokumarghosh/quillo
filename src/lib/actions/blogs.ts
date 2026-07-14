"use server"

import { serverMutation } from "../core/server"
import { AddBlogPayload, AddBlogResponse } from "../dataInterface"

export const addBlog = async (data: AddBlogPayload) => {
    return serverMutation<AddBlogResponse>("/api/blog", data, "POST")
}