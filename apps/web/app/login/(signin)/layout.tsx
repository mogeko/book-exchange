import Image from "next/image";

import { SwitchButton } from "@/app/login/_components/switch-button";
import cover from "@/app/login/_images/books_with_head.jpg";

const SigninLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900">
          <Image src={cover} className="object-cover" alt="cover" fill />
        </div>
      </div>
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
