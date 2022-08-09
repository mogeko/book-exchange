import MenusProvider from "@/providers/menusProvider";
import fetcher, { type NetworkError } from "@/lib/fetcher";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { CookiesProvider } from "react-cookie";
import type { SnackbarOrigin } from "notistack";
import { SWRConfig } from "swr";

const WrapProvider: React.FC<WrapProviderProps> = ({ children }) => {
  return (
    <SWRConfig value={swrConfig}>
      <SnackbarProvider anchorOrigin={snackbarOrigin}>
        <CookiesProvider>
          <MenusProvider>{children}</MenusProvider>
        </CookiesProvider>
      </SnackbarProvider>
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
    enqueueSnackbar(err.message, { variant: "error", preventDuplicate: true });
  },
};

const snackbarOrigin: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "right",
};

interface WrapProviderProps {
  children: React.ReactNode;
}

export default WrapProvider;
