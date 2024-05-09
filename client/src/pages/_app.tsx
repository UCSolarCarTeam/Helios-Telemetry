import type { AppProps } from "next/app";
import Image from "next/image";
import { useEffect, useState } from "react";

import { AppStateContextProvider } from "@/contexts/AppStateContext";
import { PacketContextProvider } from "@/contexts/PacketContext";
import "@/styles/globals.css";

function LoadingSpinner() {
  return (
    <div
      className={"fixed inset-0 flex items-center justify-center bg-gray-200"}
    >
      <div style={{ width: "0.2in", height: "0.2in", position: "relative" }}>
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: "translate(-50%, -50%)",
            width: "20px",
            height: "20px",
          }}
        >
          <Image
            src="/assets/HeliosBirdseye.png"
            alt="Loading..."
            width={100}
            height={100}
            style={{
              animation: "circle 2s linear infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LoadingDriveOff() {
  return (
    <div
      className={
        "fixed inset-0 flex items-center justify-center bg-transparent"
      }
    >
      <div style={{ width: "0.2in", height: "0.2in", position: "relative" }}>
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: "translate(-50%, -50%) rotate(90deg)",
            width: "20px",
            height: "20px",
          }}
        >
          <Image
            src="/assets/HeliosBirdseye.png"
            alt="Loading..."
            width={100}
            height={100}
            style={{
              animation: "driveOffScreen 1s forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const [driveOff, setDriveOff] = useState(false);

  useEffect(() => {
    const stopLoadingTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    if (!loading) {
      setDriveOff(true);
      setTimeout(() => {
        setDriveOff(false);
      }, 1000);
    }

    return () => {
      clearTimeout(stopLoadingTimer);
    };
  }, [loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AppStateContextProvider>
      <PacketContextProvider>
        {driveOff && <LoadingDriveOff />}
        <Component {...pageProps} />
      </PacketContextProvider>
    </AppStateContextProvider>
  );
}
