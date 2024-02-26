import type { AppProps } from "next/app";

import { AppStateContextProvider } from "@/contexts/AppStateContext";
import { PacketContextProvider } from "@/contexts/PacketContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppStateContextProvider>
      <PacketContextProvider>
        <Component {...pageProps} />
      </PacketContextProvider>
    </AppStateContextProvider>
  );
}
