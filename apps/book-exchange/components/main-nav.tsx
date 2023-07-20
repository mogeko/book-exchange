import Link from "next/link";
import { FaCircle } from "react-icons/fa";

import { siteConfig } from "@/config/site";

export const MainNav: React.FC = () => {
  return (
    <div className="flex sm:mr-6">
      <Link href="/" className="flex mr-4 items-center space-x-2">
        <FaCircle className="w-4 h-4 text-destructive" />
        <span className="hidden align-middle font-bold sm:inline-block">
          {siteConfig.title}
        </span>
      </Link>
    </div>
  );
};
