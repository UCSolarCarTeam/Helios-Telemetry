import { useEffect, useState } from "react";

import { ConnectionManager } from "@/components/socketIO/ConnectionManager";
import ConnectionState from "@/components/socketIO/ConnectionState";
import { Events } from "@/components/socketIO/Events";
import { MyForm } from "@/components/socketIO/MyForm";
import { socketIO } from "@/socket";

export default function SocketIOContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnected, setIsConnected] = useState(socketIO.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: string) {
      setFooEvents((previous) => [...previous, value]);
    }

    socketIO.on("connect", onConnect);
    socketIO.on("disconnect", onDisconnect);
    socketIO.on("foo", onFooEvent);
    socketIO.on("time", onFooEvent);
    return () => {
      socketIO.off("connect", onConnect);
      socketIO.off("disconnect", onDisconnect);
      socketIO.off("foo", onFooEvent);
    };
  }, []);
  useEffect(() => {
    socketIO.emit("test");
  }, []);
  return (
    <div>
      SocketIOContext
      <ConnectionState isConnected={isConnected}></ConnectionState>
      <Events events={fooEvents}></Events>
      <ConnectionManager></ConnectionManager>
      <MyForm></MyForm>
      {children}
    </div>
  );
}
