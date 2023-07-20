import type { AppProps } from "next/app";
import "@/styles/globals.css";
import WrapProvider from "@/providers/providers";

// Setup MSW for development and demo environment
if (
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_DEMO === "true"
) {
  if (typeof window === "undefined") {
    await import("@/lib/mocks/server").then(({ server }) => server.listen());
  } else {
    await import("@/lib/mocks/browser").then(({ worker }) => worker.start());
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
