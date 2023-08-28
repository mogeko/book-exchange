import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import logo from "@/public/logo-dark.svg";

import { cn } from "@/lib/utils";

export const Illustration: React.FC<
  {
    src: string | StaticImageData | { default: StaticImageData };
    invert?: boolean;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ src, className, invert = false, ...props }) => {
  return (
    <div
      className={cn(
        "bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex",
        className
      )}
      {...props}
    >
      <div className={cn("absolute inset-0 bg-zinc-900", invert && "invert")}>
        <Image src={src} className="object-cover" alt="cover" fill />
      </div>
      <Link
        className="relative z-20 flex items-center text-lg font-bold mix-blend-difference"
        href="/"
      >
        <Image src={logo} alt="logo" className="mr-2 h-6 w-6" /> Bookworm
      </Link>
    </div>
  );
};
