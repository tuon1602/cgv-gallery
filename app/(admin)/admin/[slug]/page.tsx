// "use server"
import React from "react";
import DashboardContent from "../../_component/dashboard/DashboardContent";
import UserContent from "../../_component/users/UserContent";
import { getAllUsers,getAdmins,getUsers } from "@/app/actions/userAction";
const AdminSlug = async ({ params }: { params: { slug: string } }) => {
 const allUsers = await getAllUsers()
 const admins = await getAdmins()
 const users = await getUsers()
 console.log(users)
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      {params.slug === "dashboard" && <DashboardContent />}
      {params.slug === "users" && <UserContent userFilterData={users} usersData={allUsers} adminsData={admins}/>}
      {params.slug === "images" && (
        <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          wtf
        </div>
      )}
      {params.slug === "comments" && (
        <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          wtf
        </div>
      )}
    </div>
  );
};

export default AdminSlug;
