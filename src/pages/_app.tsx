import MessageProvider from "@/layouts/providers/msgProvider";
import MenusProvider from "@/layouts/providers/menusProvider";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "@/styles/globals.css";

// Setup MSW for development and demo environment
if (
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_DEMO === "true"
) {
  if (typeof window === "undefined") {
    const { server } = await import("@/lib/mocks/server");
    server.listen();
  } else {
    const { worker } = await import("@/lib/mocks/browser");
    worker.start();
  }
}

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

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WrapProvider>
      <Component {...pageProps} />
    </WrapProvider>
  );
};

export const WrapProvider: React.FC<WrapProviderProps> = ({ children }) => {
  return (
    <SWRConfig value={swrConfig}>
      <MessageProvider>
        <MenusProvider>{children}</MenusProvider>
      </MessageProvider>
    </SWRConfig>
  );
};

interface WrapProviderProps {
  children: React.ReactNode;
}

export default App;
