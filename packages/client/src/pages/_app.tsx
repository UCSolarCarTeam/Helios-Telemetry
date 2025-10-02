import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import { EffectsProvider } from "@/components/global/EffectsProvider";
import LoadingWrapper from "@/components/global/LoadingWrapper";
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
      {/* Initialize side-effect logic for Zustand store state files */}
      <EffectsProvider />
      <MantineProvider>
        <Notifications zIndex={1400} />
        <SocketContextProvider>
          <LoadingWrapper>
            <Component {...pageProps} />
          </LoadingWrapper>
        </SocketContextProvider>
      </MantineProvider>
    </>
  );
}
