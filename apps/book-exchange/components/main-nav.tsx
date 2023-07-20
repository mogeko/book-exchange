import Link from "next/link";
import { GiBookshelf } from "react-icons/gi";

import { siteConfig } from "@/config/site";

export const MainNav: React.FC = () => {
  return (
    <div className="flex sm:mr-6">
      <Link href="/" className="flex mr-4 items-center space-x-2">
        <GiBookshelf className="w-6 h-6" />
        <span className="hidden align-middle font-bold sm:inline-block">
          {siteConfig.title}
        </span>
      </Link>
    </div>
  );
};
