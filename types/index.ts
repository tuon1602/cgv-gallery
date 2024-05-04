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

interface IAllIMages extends Image{
    description:string,
    createdAt:string,
    likes:number,
}

export interface IGetAllImages{
    status:number,
    message:string,
    images:Image[];
}