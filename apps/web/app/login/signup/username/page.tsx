import { Suspense } from "react";
import { LuLoader2 } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserUsernameFrom } from "@/app/login/signup/username/username-from";

const SignupUsernamePage: React.FC<{
  searchParams: { from?: string };
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
        <UserUsernameFrom redirectTo={searchParams.from ?? "/"} />
      </Suspense>
    </>
  );
};

const UserUsernameFromFallback: React.FC = () => {
  return (
    <div className="grid gap-2">
      <div className="space-y-1">
        <Label>Username</Label>
        <Input placeholder="Your username" disabled />
      </div>
      <div className="grid gap-1">
        <Button disabled>
          <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
        <Button variant="secondary" disabled>
          Set it up later
        </Button>
      </div>
    </div>
  );
};

export default SignupUsernamePage;
