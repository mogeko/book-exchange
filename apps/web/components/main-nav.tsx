import Image from "next/image";
import Link from "next/link";
import logoDark from "@/public/logo-dark.svg";
import logoLight from "@/public/logo-light.svg";

import { siteConfig } from "@/config/site";

export const MainNav: React.FC = () => {
  return (
    <div className="flex sm:mr-6">
      <Link href="/" className="mr-4 flex items-center space-x-2">
        <Image
          className="block h-6 w-6 dark:hidden"
          src={logoLight}
          alt="logo"
        />
        <Image
          className="hidden h-6 w-6 dark:block"
          src={logoDark}
          alt="logo"
        />
        <span className="hidden align-middle font-bold sm:inline-block">
          {siteConfig.title}
        </span>
      </Link>
    </div>
  );
};
