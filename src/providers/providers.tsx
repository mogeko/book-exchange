import MenusProvider from "@/providers/menusProvider";
import fetcher, { type NetworkError } from "@/lib/fetcher";
import { SWRConfig } from "swr";

const WrapProvider: React.FC<WrapProviderProps> = ({ children }) => {
  return (
    <SWRConfig value={swrConfig}>
      <MenusProvider>{children}</MenusProvider>
    </SWRConfig>
  );
};

const swrConfig = {
  // Disable automatic re-request
  // https://swr.bootcss.com/docs/revalidation
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateFirstPage: false,
  // Global fetcher
  fetcher,
  // Global Error handler
  onError: (err: NetworkError) => {
    console.error(err);
  },
};

interface WrapProviderProps {
  children: React.ReactNode;
}

export default WrapProvider;
