import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
          Copyright © <CopyrightYear />, <AuthorInfo />.
        </p>
      </div>
    </footer>
  );
};

const CopyrightYear: React.FC = () => {
  const now = new Date().getFullYear();

  if (now <= siteConfig.copyrightYear) return <span>{now}</span>;

  return (
    <span>
      {siteConfig.copyrightYear} - {now}
    </span>
  );
};

const AuthorInfo: React.FC = () => {
  return (
    <>
      <span className="mr-2 hidden sm:inline-block">All right reserved</span>
      <Link
        className={buttonVariants({ variant: "link", size: null })}
        href={siteConfig.authorHomePage}
      >
        {siteConfig.author}
      </Link>
    </>
  );
};
