"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="col-span-2"
    >
      {pending ? "Creating" : "Create"}
    </Button>
  );
};

export default SubmitButton;
