import { Suspense } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";

import { UserUsernameFrom } from "@/app/login/signup/username/username-from";

const SignupUsernamePage: React.FC<{
  searchParams: ReadonlyURLSearchParams;
}> = ({ searchParams }) => {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          It&lsquo;s almost done!
        </h1>
        <p className="text-muted-foreground text-sm">
          May we know your username?
        </p>
      </div>
      <Suspense fallback={<UserUsernameFromFallback />}>
        <UserUsernameFrom redirectTo={searchParams.get("from") ?? "/"} />
      </Suspense>
    </>
  );
};

const UserUsernameFromFallback: React.FC = () => {
  return null;
};

export default SignupUsernamePage;
