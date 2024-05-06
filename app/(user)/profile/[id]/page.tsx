import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex items-center justify-center w-full mt-5">
      {/* allow user to change avatar */}
      {session?.user?.userId === params.id && <div>img</div>}
    </div>
  );
};

export default ProfilePage;
