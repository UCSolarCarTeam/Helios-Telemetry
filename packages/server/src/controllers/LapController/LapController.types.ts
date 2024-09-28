import { type BackendController } from "@/controllers/BackendController/BackendController";

import type { CoordInfoUpdate, ITelemetryData } from "@shared/helios-types";

export interface LapControllerType {
  backendController: BackendController;
  calculateAverageLapSpeed(lastLapPackets: ITelemetryData[]): number;
  calculateAveragePackCurrent(lastLapPackets: ITelemetryData[]): number;
  calculateMotorDistance(
    packetArray: ITelemetryData[],
    odometerIndex: number,
  ): number;
  checkIfMotorReset(
    motorOdometer: number,
    motorDistanceTraveledSession: number,
  ): boolean;
  getAveragePowerIn(packetArray: ITelemetryData[]): number;
  getAveragePowerOut(packetArray: ITelemetryData[]): number;
  getLastPacket(): ITelemetryData[];
  getSecondsRemainingUntilChargedOrDepleted(
    averagePackCurrent: number,
    packAmpHours: number,
  ): number;
  handlePacket(packet: ITelemetryData): void;
  lapNumber: number;
  lastLapPackets: ITelemetryData[];
  netPower(packetArray: ITelemetryData[]): number;
  previouslyInFinishLineProximity: boolean;
  setFinishLineLocation(coords: CoordInfoUpdate): void;
}
