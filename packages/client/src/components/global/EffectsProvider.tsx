import AppStateEffectsManager from "@/components/global/AppStateEffectsManager";
import { LapListenerManager } from "@/components/global/LapDataListenerManager";
import { PacketListenerManager } from "@/components/global/PacketListenerManager";

export function EffectsProvider() {
  return (
    <>
      <LapListenerManager />
      <PacketListenerManager />
      <AppStateEffectsManager />
    </>
  );
}
