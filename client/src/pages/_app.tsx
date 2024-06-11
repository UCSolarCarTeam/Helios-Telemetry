import type { AppProps } from "next/app";

import { AppStateContextProvider } from "@/contexts/AppStateContext";
import { PacketContextProvider } from "@/contexts/PacketContext";
import { SocketContextProvider } from "@/contexts/SocketContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppStateContextProvider>
      <SocketContextProvider>
        <PacketContextProvider>
          <Component {...pageProps} />
        </PacketContextProvider>
      </SocketContextProvider>
    </AppStateContextProvider>
  );
}
