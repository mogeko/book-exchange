import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const siteConfig = {
  title: "Bookworm",
  description: "A WebApplication for used book exchange",
  author: (
    <Link
      className={buttonVariants({ variant: "link", size: null })}
      href="https://github.com/mogeko"
    >
      Zheng Junyi
    </Link>
  ),
};

export type SiteConfig = typeof siteConfig;
