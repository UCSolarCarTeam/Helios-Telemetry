import type { AppProps } from "next/app";

import { AppStateContextProvider } from "@/contexts/AppStateContext";
import { GraphOverlayContextProvider } from "@/contexts/GraphOverlayContext";
import { PacketContextProvider } from "@/contexts/PacketContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppStateContextProvider>
      <PacketContextProvider>
        <GraphOverlayContextProvider>
          <Component {...pageProps} />
        </GraphOverlayContextProvider>
      </PacketContextProvider>
    </AppStateContextProvider>
  );
}
