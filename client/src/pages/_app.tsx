import type { AppProps } from "next/app";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { LoadingWrapper } from "@/components/global/LoadingWrapper";
import { AppStateContextProvider } from "@/contexts/AppStateContext";
import { PacketContextProvider } from "@/contexts/PacketContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppStateContextProvider>
        <PacketContextProvider>
          <LoadingWrapper>
            <Component {...pageProps} />
          </LoadingWrapper>
        </PacketContextProvider>
      </AppStateContextProvider>
    </>
  );
}
