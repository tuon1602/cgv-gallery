"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout now</Button>
    </div>
  );
};

export default LogoutButton;
