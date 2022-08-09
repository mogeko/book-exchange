import { VscError, VscLoading } from "react-icons/vsc";
import { useUser } from "@/lib/hooks/useUsers";
import { MenusContext } from "@/providers/menusProvider";
import Skeleton from "@/components/base/skeleton";
import Badge from "@/components/badge";
import { HiUser } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useCookies } from "react-cookie";

const User: React.FC = () => {
  const [cookies, _, removeCookie] = useCookies();
  const logout = () => {
    removeCookie("auth-id");
    removeCookie("auth-token");
  };

  if (!cookies["auth-id"]) return <UnLoginUser />;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="hidden sm:block normal-case">
        <UserBar uid={cookies["auth-id"]} />
      </label>
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar sm:hidden">
        <div className="w-6 rounded-full">
          <UserAvatar uid={cookies["auth-id"]} />
        </div>
      </label>
      <UserMenu logout={logout} />
    </div>
  );
};

const UnLoginUser: React.FC = () => (
  <>
    <div className="normal-case hidden sm:block">
      <Link href="/login">
        <a className="btn btn-link btn-xs w-40 flex-nowrap">
          Sign in / Sign up
        </a>
      </Link>
    </div>
    <Link href="/login">
      <a className="btn btn-ghost btn-circle avatar sm:hidden">
        <HiUser className="h-6 w-6" aria-hidden="true" />
      </a>
    </Link>
  </>
);

const UserBar: React.FC<UserProps> = ({ uid }) => {
  const { data, isLoading } = useUser(uid);

  if (isLoading) return <Skeleton.Line className="animate-pulse w-20 mr-4" />;
  return (
    <div className="btn btn-link btn-xs text-base-content w-40 flex-nowrap">
      Hi!&nbsp;<b className="truncate">{data?.username}</b>
    </div>
  );
};

const UserAvatar: React.FC<UserProps> = ({ uid }) => {
  const { data, error, isLoading } = useUser(uid);
  if (error) return <VscError className="w-6 h-6 text-error" />;
  if (isLoading) return <VscLoading className="animate-spin w-6 h-6" />;
  return <Image src={data?.avatar!} width={24} height={24} alt="User avatar" />;
};

const UserMenu: React.FC<UserMenuProps> = ({ logout }) => {
  const menus = useContext(MenusContext);
  const handleLogout = () => logout();

  return (
    <ul
      tabIndex={0}
      className="menu menu-compact dropdown-content shadow bg-base-300 rounded-box w-52 mt-3 p-2 sm:mt-4 sm:p-0"
      role="menu"
      aria-label="User Menu"
    >
      {Object.entries(menus.user).map(([key, [name, href]], index) => (
        <li key={index} role="menuitem" aria-label="User Menu Item">
          <Link href={href}>
            <a className="justify-between">
              <span>{name}</span>
              <Badge badgeKey={key} />
            </a>
          </Link>
        </li>
      ))}
      <li role="menuitem" aria-label="User Menu Item">
        <button onClick={handleLogout}>Sign out</button>
      </li>
    </ul>
  );
};

interface UserProps {
  uid: `${number}`;
}

interface UserMenuProps {
  logout: () => void;
}

export default User;
