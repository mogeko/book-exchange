import { Suspense } from "react";
import { LuLoader2 } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSignupForm } from "@/app/login/signup/signup-form";

const SignupPage: React.FC<{
  searchParams: { from?: string };
}> = ({ searchParams }) => {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your email below to create your account
        </p>
      </div>
      <Suspense fallback={<UserSignupFormFallback />}>
        <UserSignupForm searchParams={searchParams} />
      </Suspense>
    </>
  );
};

const UserSignupFormFallback: React.FC = () => {
  return (
    <div className="grid gap-2">
      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="email" placeholder="name@example.com" disabled />
      </div>
      <Button disabled>
        <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  );
};

export default SignupPage;
