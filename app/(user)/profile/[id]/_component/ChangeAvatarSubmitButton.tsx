import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface IProps {
  avatar: File | undefined;
}

const ChangeAvatarSubmitButton: React.FC<IProps> = ({ avatar }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {avatar ? (
        <Button disabled={pending} aria-disabled={pending}>
          {pending ? "Saving ..." : "Save Change"}
        </Button>
      ) : (
        <Button disabled={true}>Save change</Button>
      )}
    </>
  );
};

export default ChangeAvatarSubmitButton;
