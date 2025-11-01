import AppStateEffectsManager from "@/components/global/AppStateEffectsManager";
import { LapListenerManager } from "@/components/global/LapDataListenerManager";
import { PacketListenerManager } from "@/components/global/PacketListenerManager";
import SocketManager from "@/components/global/SocketManager";

export function EffectsProvider() {
  return (
    <>
      <LapListenerManager />
      <PacketListenerManager />
      <AppStateEffectsManager />
      <SocketManager />
    </>
  );
}
