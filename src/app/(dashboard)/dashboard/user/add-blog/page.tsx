import AddBlogForm from '@/components/dashboard/user/AddBlogForm';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Add Blog | User",
  description: "A modern blogging platform to write and share your stories.",
};


const AddBlogPage = () => {
    return (
        <div>
            <AddBlogForm/>
        </div>
    );
};

export default AddBlogPage;