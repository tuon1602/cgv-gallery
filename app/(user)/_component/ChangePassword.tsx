"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/app/actions/userAction";
import { useFormState, useFormStatus } from "react-dom";
import ChangePasswordSubmitButton from "./ChangePasswordSubmitButton";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface IProps {
  userId: string | undefined;
}

const ChangePassword: React.FC<IProps> = ({ userId }) => {
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const [state, changePasswordAction] = useFormState(changePassword, undefined);
  const { pending } = useFormStatus();
  return (
    <form action={changePasswordAction} key={state?.status}>
      <Card className="border-0">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you&apos;ll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current">Current password</Label>
            <Input
              id="current"
              type="password"
              name="current-password"
              ref={currentPasswordRef}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" name="new-password" />
          </div>
          <Input
            type="hidden"
            name="userId"
            value={userId}
            ref={newPasswordRef}
          />
          {state && <p className="text-red-500">{state.message}</p>}
        </CardContent>
        <CardFooter>
          <ChangePasswordSubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
};

export default ChangePassword;
