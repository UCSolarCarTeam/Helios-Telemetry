import React from "react";

import { socketIO as socket } from "@/socket";

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <div className="flex flex-row gap-4 p-4">
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    </>
  );
}
