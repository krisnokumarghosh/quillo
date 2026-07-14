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