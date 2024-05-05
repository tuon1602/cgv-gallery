import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className="disabled:cursor-not-allowed"
      aria-disabled={pending}
    >
      {pending ? "Posting..." :"Post"}
    </Button>
  );
};

export default SubmitButton;
