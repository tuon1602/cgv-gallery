import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import AvatarForm from "./_component/AvatarForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserAvatar, getUserById, getUsers } from "@/actions/userAction";
import UserImages from "./_component/UserImages";
import { Toaster } from "@/components/ui/sonner";
import { IUsers } from "@/types";

export async function generateStaticParams() {
  const users: any = await getUsers();
  return users.map((user: any) => ({
    id: user.userId,
  }));
}

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const userData = await getUserById(params.id);
  const session = await getServerSession(authOptions);
  const userAvatar = await getUserAvatar(params.id);
  return (
    <div className="flex items-center w-full h-full mt-5 flex-col space-y-5 max-w-[1000px] m-auto">
      {/* allow user to change avatar */}
      {session?.user?.userId === params.id ? (
        <AvatarForm
          currentAvatar={userAvatar?.avatarUrl}
          userId={session?.user?.userId}
        />
      ) : (
        <Avatar className="w-20 h-20">
          <AvatarImage src={userAvatar?.avatarUrl} alt={session?.user?.name} />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      )}
      <h1 className="text-2xl font-bold">
        {userData?.name}
        <span className="text-gray-500 ml-2">({userData?.userId})</span>
      </h1>
      <h2 className="text-xl font-bold">Posts: {userData?.images.length}</h2>
      <div className="max-lg:px-2 px-10">
        {userData?.images.length > 0 ? (
          <UserImages imageData={userData?.images} />
        ) : (
          <p>No posts yet</p>
        )}
      </div>
      <Toaster richColors position="top-center" duration={100} />
    </div>
  );
};

export default ProfilePage;
