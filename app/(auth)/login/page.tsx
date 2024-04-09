import React from "react";
import LoginForm from "../_component/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session){
    redirect("/")
  }
    return (
      <>
        <LoginForm />
      </>
    );
};

export default LoginPage;
