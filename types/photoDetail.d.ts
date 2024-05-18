export interface PhotoDetailResponse{
    status:number,
    message:string,
    images:Image
}
interface User{
    id:number,
    name:string,
    userId:string,
    avatarUrl:string,
    role:string,
}
  interface Comment{
    id:number,
    content:string,
    userId:string,
    userCommentId:number,
    imageId:number,
    createdAt:string,
    updatedAt:string,
    commentedBy:User,
    image:Image,
  }
interface Image{
    id:number,
    title:string,
    description:string,
    imageUrl:string[],
    createdById:number,
    createdAt:string,
    updatedAt:string,
    userId:string,
    likes:number,
    comments:Comment[],
    tags:string[],
    createdBy:User
}