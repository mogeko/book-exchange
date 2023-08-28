import { Illustration } from "@/app/login/_components/illustration";
import { SwitchButton } from "@/app/login/_components/switch-button";
import cover from "@/app/login/_images/books_with_head.jpg";

const SigninLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Illustration src={cover} />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
        <SwitchButton href="/login/signup">Sign up</SwitchButton>
      </div>
    </>
  );
};

export default SigninLayout;
