import { Suspense } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";

import { UserSignupForm } from "@/app/login/signup/signup-form";

const SignupPage: React.FC<{
  searchParams: ReadonlyURLSearchParams;
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
        <UserSignupForm
          searchParams={new URLSearchParams(searchParams.toString())}
        />
      </Suspense>
    </>
  );
};

const UserSignupFormFallback: React.FC = () => {
  return null;
};

export default SignupPage;
