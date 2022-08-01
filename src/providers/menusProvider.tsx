import { createContext } from "react";

const defaultMenus = {
  root: {
    MENUS_LIBRARY: ["My library", "#"],
    MENUS_RANKING: ["Ranking", "#"],
    MENUS_QUOTE: ["Quote", "#"],
  },
  user: {
    USER_PROFILE: ["Profile", "#"],
    USER_SETTINGS: ["Settings", "#"],
  },
};

export const MenusContext = createContext(defaultMenus);

const MenusProvider: React.FC<MenusProviderProps> = ({ value, ...others }) => {
  return <MenusContext.Provider value={value ?? defaultMenus} {...others} />;
};

type MenusProviderProps<T = typeof defaultMenus> = {
  value?: T;
} & Omit<React.ProviderProps<T>, "value">;

export default MenusProvider;
