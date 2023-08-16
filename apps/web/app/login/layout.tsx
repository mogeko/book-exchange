import Image from "next/image";

import cover from "@/app/login/_images/books_with_head.jpg";

const LoginLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="container relative grid h-[800px] flex-1 flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900">
          <Image src={cover} className="object-cover" alt="cover" fill />
        </div>
      </div>
      <div className="lg:p-8">{children}</div>
    </div>
  );
};

export default LoginLayout;
