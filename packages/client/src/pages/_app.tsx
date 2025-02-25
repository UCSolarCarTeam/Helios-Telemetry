import type { AppProps } from "next/app";

import LoadingWrapper from "@/components/global/LoadingWrapper";
import { AppStateContextProvider } from "@/contexts/AppStateContext";
import { LapDataContextProvider } from "@/contexts/LapDataContext";
import { PacketContextProvider } from "@/contexts/PacketContext";
import { SocketContextProvider } from "@/contexts/SocketContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppStateContextProvider>
        <SocketContextProvider>
          <PacketContextProvider>
            <LapDataContextProvider>
              <LoadingWrapper>
                <Component {...pageProps} />
              </LoadingWrapper>
            </LapDataContextProvider>
          </PacketContextProvider>
        </SocketContextProvider>
      </AppStateContextProvider>
    </>
  );
}
