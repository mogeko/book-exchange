import { Suspense } from "react";
import { LuLoader2 } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSigninForm } from "@/app/login/(signin)/signin-form";

const SigninPage: React.FC<{
  searchParams: { from?: string };
}> = ({ searchParams }) => {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to Bookwarm
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email and password to continue
        </p>
      </div>
      <Suspense fallback={<UserSigninFormFallback />}>
        <UserSigninForm redirectTo={searchParams.from ?? "/"} />
      </Suspense>
    </>
  );
};

const UserSigninFormFallback: React.FC = () => {
  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <div className="space-y-1">
          <Label>Email</Label>
          <Input type="email" placeholder="name@example.com" disabled />
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

export default SigninPage;
