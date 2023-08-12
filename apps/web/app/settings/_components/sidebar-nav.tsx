"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoShieldLock } from "react-icons/go";
import { LuPaintbrush, LuSettings, LuUser } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const SidebarNav: React.FC = () => {
  const pathname = usePathname();

  const sidebarNavItems = useMemo(
    () => [
      { title: "Profile", href: "/settings", icon: LuUser },
      { title: "Account", href: "/settings/account", icon: LuSettings },
      { title: "Appearance", href: "/settings/appearance", icon: LuPaintbrush },
      { title: "Security", href: "/settings/security", icon: GoShieldLock },
    ],
    []
  );

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      {sidebarNavItems.map(({ title, href, icon: Icon }) => (
        <Link
          key={`settings-${title}-${href}`}
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {title}
        </Link>
      ))}
    </nav>
  );
};
