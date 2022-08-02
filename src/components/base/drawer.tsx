import { MenusContext } from "@/providers/menusProvider";
import Badge from "@/components/badge";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import { useContext } from "react";

const DrawerMenu: React.FC<DrawerMenuProps> = ({ toggleId }) => {
  return (
    <div className="drawer-side">
      <label htmlFor={toggleId} className="drawer-overlay" />
      <MenusButtons />
    </div>
  );
};

const MenusButtons: React.FC = () => {
  const menus = useContext(MenusContext);

  return (
    <ul
      className="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content"
      aria-label="Drawer Menu"
      role="menu"
    >
      {Object.entries(menus.root).map(([key, [name, href]], index) => (
        <li key={index} role="menuitem">
          <Link href={href}>
            <a className="justify-between">
              <span>{name}</span>
              <Badge badgeKey={key} />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const withDrawer = (
  WrappedComponent: React.FC<Pick<DrawerProps, "children">>
) => {
  const DrawerWrapper: React.FC<DrawerProps> = (props) => {
    return (
      <div className="drawer">
        <input
          id={props.toggleId}
          type="checkbox"
          className="drawer-toggle"
          aria-hidden
        />
        <div className="drawer-content">
          <WrappedComponent>{props.children}</WrappedComponent>
        </div>
        <DrawerMenu toggleId={props.toggleId} />
      </div>
    );
  };
  return DrawerWrapper;
};

export const DrawerButton: React.FC<DrawerButtonProps> = ({ toggleId }) => {
  return (
    <label
      htmlFor={toggleId}
      className="btn btn-ghost btn-circle"
      aria-label="Drawer Button"
      role="button"
    >
      <HiMenu className="h-6 w-6" aria-hidden="true" />
    </label>
  );
};

interface DrawerMenuProps {
  toggleId: string;
}

type DrawerProps = {
  children: React.ReactNode;
} & DrawerMenuProps;

type DrawerButtonProps = Pick<DrawerProps, "toggleId">;
