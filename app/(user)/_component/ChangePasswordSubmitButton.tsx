"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const ChangePasswordSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Saving password ..." : "Save password"}
    </Button>
  );
};

export default ChangePasswordSubmitButton;
