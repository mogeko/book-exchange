import { DrawerButton } from "@/components/base/drawer";
import Search from "@/components/search";
import Logo from "@/components/base/logo";
import User from "@/components/user";
import Badge from "@/components/badge";
import logoImage from "@/public/images/logo.svg";
import { MenusContext } from "@/providers/menusProvider";
import Link from "next/link";
import { useContext } from "react";

const Header: React.FC = () => {
  return (
    <div className="min-w-full">
      <TopNavbar />
      <div className="bg-inherit p-2 md:p-0 md:bg-base-300">
        <header className="navbar p-0 m-auto rounded-md max-w-screen-lg bg-base-300 md:rounded-none">
          <div className="navbar-start sm:hidden">
            <DrawerButton toggleId="mobile-menu" />
          </div>
          <div className="navbar-center sm:navbar-start">
            <Logo src={logoImage}>Bookworm</Logo>
          </div>
          <div className="navbar-end">
            <Search />
            <div className="sm:hidden">
              <User />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

const TopNavbar: React.FC = () => {
  const menus = useContext(MenusContext);

  return (
    <div
      className="hidden h-7 bg-black justify-between sm:flex"
      data-theme="dracula"
    >
      <nav className="navbar min-h-0 flex-">
        {Object.entries(menus.root).map(([key, [name, href]], index) => (
          <Link href={href} key={index}>
            <a className="btn btn-link btn-xs gap-1 text-gray-400 hover:text-primary focus:text-primary-focus">
              {name}
              <Badge className="badge-xs badge-primary" badgeKey={key} />
            </a>
          </Link>
        ))}
        <Link href="/random">
          <a className="btn btn-link btn-xs text-gray-400 hover:text-primary focus:text-primary-focus">
            I&apos;m Feeling Lucky!
          </a>
        </Link>
      </nav>
      <div className="justify-end">
        <User />
      </div>
    </div>
  );
};

export default Header;
