import type { AppProps } from "next/app";
import "@/styles/globals.css";
import WrapProvider from "@/layouts/providers";

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

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WrapProvider>
      <Component {...pageProps} />
    </WrapProvider>
  );
};

export default App;
