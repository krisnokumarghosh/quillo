import MyBlogsList from '@/components/dashboard/user/MyBlogList';
import { getBlogsById } from '@/lib/api/blogs';
import { getUserSession } from '@/lib/core/session';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "My Blogs | User",
  description: "A modern blogging platform to write and share your stories.",
};


const MyBlogsPage = async () => {
    const user = await getUserSession()
   const blogs = await getBlogsById(user!.id);
    return (
        <div>
            <MyBlogsList blogs={blogs}/>
        </div>
    );
};

export default MyBlogsPage;