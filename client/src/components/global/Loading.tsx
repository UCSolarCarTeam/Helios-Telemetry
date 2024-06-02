import Image from "next/image";
import { use, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { LOADINGSTAGES } from "@/components/global/LoadingWrapper";
import { useAppState } from "@/contexts/AppStateContext";

export function Loading(props: { currentLoadingState: LOADINGSTAGES }) {
  const { currentLoadingState } = props;
  return (
    <div
      className={`dark:bg-dark fixed z-50 flex h-screen w-screen items-center justify-center bg-white`}
    >
      <div className="left-1/2 top-1/2 flex flex-col items-center justify-center">
        <div className="flex h-96 w-96 items-center justify-center ">
          <Image
            priority
            quality={50}
            className={twMerge(
              currentLoadingState === LOADINGSTAGES.PENDING && "animate-bump",
              currentLoadingState === LOADINGSTAGES.READY &&
                "animate-driveOffScreen",
              currentLoadingState === LOADINGSTAGES.DRIVE_IN &&
                "animate-driveInScreen",
            )}
            src="/assets/HeliosSideView.png"
            alt="Loading..."
            width={300}
            height={300}
          />
        </div>
        <div
          className={twMerge(
            "animate-circle absolute flex h-96 w-96 items-center justify-center",
            currentLoadingState === LOADINGSTAGES.PENDING
              ? "visible"
              : "invisible",
          )}
        >
          <Image
            className=""
            src="/assets/Sun.png"
            alt="Loading..."
            width={55}
            height={55}
          />
        </div>
        <div className="dark:bg-dark absolute bottom-1/4 z-40 h-1/6 w-full bg-white" />
        <h2
          className={twMerge(
            "z-50 text-2xl",
            currentLoadingState !== LOADINGSTAGES.READY && "text-helios",
            currentLoadingState === LOADINGSTAGES.READY && "text-green",
          )}
        >
          {
            {
              1: "Connecting to Helios...",
              2: "Connecting to Helios...",
              3: "Connected to Helios!",
            }[currentLoadingState]
          }
        </h2>
      </div>
    </div>
  );
}
