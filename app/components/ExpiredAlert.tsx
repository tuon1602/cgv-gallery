import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ExpiredAlert = () => {
  return (
    <Alert>
      <AlertTitle>Hết phiên đăng nhập</AlertTitle>
      <AlertDescription>
        Phiên đăng nhập của bạn đã hết, vui lòng đăng nhập lại
      </AlertDescription>
    </Alert>
  );
};

export default ExpiredAlert;
