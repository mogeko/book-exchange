import { SwitchButton } from "@/app/login/_components/switch-button";

const SignupLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {children}
      </div>
      <SwitchButton href="/login">Sign in</SwitchButton>
    </>
  );
};

export default SignupLayout;
