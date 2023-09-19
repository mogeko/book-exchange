import { Suspense } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";

import { UserPasswordForm } from "@/app/login/signup/password/password-form";

const SignupPasswordPage: React.FC<{
  searchParams: ReadonlyURLSearchParams;
}> = ({ searchParams }) => {
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
      <Suspense fallback={<UserPasswordFormFallback />}>
        <UserPasswordForm searchParams={searchParams} />
      </Suspense>
    </>
  );
};

const UserPasswordFormFallback: React.FC = () => {
  return null;
};

export default SignupPasswordPage;
