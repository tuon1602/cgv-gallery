import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ExpiredAlert = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <Alert>
        <AlertTitle>Hết phiên đăng nhập</AlertTitle>
        <AlertDescription>
          Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập lại
        </AlertDescription>
      </Alert>
    );
  }
  return;
};

export default ExpiredAlert;
