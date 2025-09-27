import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import { LapListenerManager } from "@/components/global/LapDataListenerManager";
import LoadingWrapper from "@/components/global/LoadingWrapper";
import { PacketListenerManager } from "@/components/global/PacketListenerManager";
import { AppStateContextProvider } from "@/contexts/AppStateContext";
import { SocketContextProvider } from "@/contexts/SocketContext";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Notifications />
        <AppStateContextProvider>
          <SocketContextProvider>
            <LoadingWrapper>
              <LapListenerManager />
              <PacketListenerManager />
              <Component {...pageProps} />
            </LoadingWrapper>
          </SocketContextProvider>
        </AppStateContextProvider>
      </ThemeProvider>
    </MantineProvider>
  );
}
