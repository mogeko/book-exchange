import { UserPasswordForm } from "@/app/login/signup/password/password-form";

const SignupPasswordPage: React.FC = () => {
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
      <UserPasswordForm />
    </>
  );
};

export default SignupPasswordPage;
