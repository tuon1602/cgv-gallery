export interface Image {
  id: number;
  userId: string;
  createdBy: {
    id: number;
    userId: string;
    avatarUrl: string;
    name: string;
  };
  title: string;
  imageUrl: string[];
  comments: any[];
  description: string;
  createdAt: string;
  likes: number;
}

export interface IUserSearchDetail {
  id: number;
  userId: string;
  avatarUrl: string;
  name: string;
}

export interface ISearchResult {
  status: number;
  message: string;
  result: {
    users: IUserSearchDetail[]; // You can define the type for users if needed
    images: Image[];
  };
}

interface IAllIMages extends Image {
  description: string;
  createdAt: string;
  likes: number;
}

export interface IGetAllImages {
  status: number;
  message: string;
  images: Image[];
}
export interface IImageDetail {
  status: number;
  message: string;
  images: Image;
}

export interface CommentImage {
  id: number;
  content: string;
  userId: string;
  userCommentId: string;
  imageId: string;
  createdAt: string;
  updatedAt: string;
  commentedBy: {
    id: number;
    avatarUrl: string;
    name: string;
    role: string;
  };
}
export interface IImageComment {
  status: number;
  message: string;
  allCommentsByImageId: CommentImage[];
}
