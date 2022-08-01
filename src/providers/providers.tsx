import MessageProvider from "@/providers/msgProvider";
import MenusProvider from "@/providers/menusProvider";
import { SWRConfig } from "swr";

const WrapProvider: React.FC<WrapProviderProps> = ({ children }) => {
  return (
    <SWRConfig value={swrConfig}>
      <MessageProvider>
        <MenusProvider>{children}</MenusProvider>
      </MessageProvider>
    </SWRConfig>
  );
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const swrConfig = {
  fetcher,
  // Disable automatic re-request
  // https://swr.bootcss.com/docs/revalidation
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateFirstPage: false,
};

interface WrapProviderProps {
  children: React.ReactNode;
}

interface _WrapProviderProps {
  wrapers: [React.JSXElementConstructor<React.PropsWithChildren<any>>, any][];
  children: React.ReactNode;
}

export default WrapProvider;
