import React from "react";

export default function ConnectionState({
  isConnected,
}: {
  isConnected: boolean;
}) {
  return <div>{`State: ${isConnected ? "connected" : "disconnected"}`}</div>;
}
