import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSignupForm } from "@/app/login/_components/user-signup-form";
import { UserSigninForm } from "@/app/login/(signin)/signin-form";

const LoginPage: React.FC = () => {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to Bookwarm
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and password to continue
          </p>
        </div>
        <UserSigninForm />
      </div>
      <Link
        href="/login/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Sign up
      </Link>
    </>
  );
};

export default LoginPage;
