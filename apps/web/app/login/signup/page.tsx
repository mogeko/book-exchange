import { UserSignupForm } from "@/app/login/signup/signup-form";

const SignupPage: React.FC = () => {
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
      <UserSignupForm />
    </>
  );
};

export default SignupPage;
