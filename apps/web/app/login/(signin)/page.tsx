import { SwitchButton } from "@/app/login/_components/switch-button";
import { UserSigninForm } from "@/app/login/(signin)/signin-form";

const SigninPage: React.FC = () => {
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
      <SwitchButton href="/login/signup">Sign up</SwitchButton>
    </>
  );
};

export default SigninPage;
