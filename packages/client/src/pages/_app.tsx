import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import AppStateEffects from "@/components/global/AppStateEffectsManager";
import LoadingWrapper from "@/components/global/LoadingWrapper";
import { LapDataContextProvider } from "@/contexts/LapDataContext";
import { PacketContextProvider } from "@/contexts/PacketContext";
import { SocketContextProvider } from "@/contexts/SocketContext";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <AppStateEffects /> */}
      <MantineProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Notifications />
          <AppStateEffects />

          <SocketContextProvider>
            <PacketContextProvider>
              <LapDataContextProvider>
                <LoadingWrapper>
                  <Component {...pageProps} />
                </LoadingWrapper>
              </LapDataContextProvider>
            </PacketContextProvider>
          </SocketContextProvider>
        </ThemeProvider>
      </MantineProvider>
    </>
  );
}
