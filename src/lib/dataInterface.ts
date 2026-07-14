export interface AddBlogPayload {
  userId: string;
  userName: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  thumbnail: string;
}

export interface AddBlogResponse {
  acknowledged: boolean;
  insertedId: string;
}


export interface Blog {
  _id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  thumbnail: string;
  createdAt: string;
}

export interface GetAllBlogsResponse {
  blogs: Blog[];
  total: number;
  hasMore: boolean;
}

export interface GetAllBlogsParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export type Props = {
  params: Promise<{
    id: string;
  }>;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role?: string | null;
  createdAt: string;
  updatedAt: string;
}