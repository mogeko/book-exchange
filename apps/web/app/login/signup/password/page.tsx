import { Suspense } from "react";
import { LuLoader2 } from "react-icons/lu";

import { decode } from "@/lib/base64";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPasswordForm } from "@/app/login/signup/password/password-form";

const SignupPasswordPage: React.FC<{
  searchParams: { state?: string; from?: string };
}> = ({ searchParams }) => {
  const state = JSON.parse(decode(searchParams.state ?? "e30="));

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your password to continue
        </p>
      </div>
      <Suspense fallback={<UserPasswordFormFallback email={state.email} />}>
        <UserPasswordForm searchParams={searchParams} state={state} />
      </Suspense>
    </>
  );
};

const UserPasswordFormFallback: React.FC<{ email?: string }> = ({ email }) => {
  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder={email ?? "name@example.com"}
            disabled
          />
        </div>
        <div className="space-y-1">
          <Label>Password</Label>
          <Input type="password" placeholder="password" disabled />
        </div>
      </div>
      <Button disabled>
        <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  );
};

export default SignupPasswordPage;
