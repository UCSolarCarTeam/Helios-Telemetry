import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import fakeData from "@/contexts/fakePacket.json";
import type ITelemetryData from "@/objects/telemetry-data.interface";
import { faker } from "@faker-js/faker";

interface PacketContextProps {
  children: ReactNode | ReactNode[];
}

interface IPackContextReturn {
  currentPacket: ITelemetryData;
  setCurrentPacket: (packet: ITelemetryData) => void;
}

const packetContext = createContext<IPackContextReturn>(
  {} as IPackContextReturn,
);

export function PacketContextProvider({
  children,
}: PacketContextProps): JSX.Element {
  const [currentPacket, setCurrentPacket] = useState<ITelemetryData>(
    fakeData as ITelemetryData,
  );

  // Generate random data for local dev mode
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPacket({
        PacketTitle: faker.lorem.words(2),
        AuxBms: {
          AllowCharge: faker.datatype.boolean(),
          AllowDischarge: faker.datatype.boolean(),
          AuxBmsAlive: faker.datatype.boolean(),
          AuxVoltage: faker.number.int({ min: 0, max: 100 }),
          ChargeContactorError: faker.datatype.boolean(),
          ChargeNotClosedDueToHighCurrent: faker.datatype.boolean(),
          ChargeOpenButShouldBeClosed: faker.datatype.boolean(),
          ChargeShouldTrip: faker.datatype.boolean(),
          ChargeTripDueToHighCellVoltage: faker.datatype.boolean(),
          ChargeTripDueToHighTemperatureAndCurrent: faker.datatype.boolean(),
          ChargeTripDueToPackCurrent: faker.datatype.boolean(),
          CommonContactorError: faker.datatype.boolean(),
          DischargeContactorError: faker.datatype.boolean(),
          DischargeNotClosedDueToHighCurrent: faker.datatype.boolean(),
          DischargeOpenButShouldBeClosed: faker.datatype.boolean(),
          DischargeShouldTrip: faker.datatype.boolean(),
          DischargeTripDueToHighTemperatureAndCurrent: faker.datatype.boolean(),
          DischargeTripDueToLowCellVoltage: faker.datatype.boolean(),
          DischargeTripDueToPackCurrent: faker.datatype.boolean(),
          HighVoltageEnableState: faker.datatype.boolean(),
          OrionCANReceivedRecently: faker.datatype.boolean(),
          PrechargeState: faker.lorem.words(2),
          ProtectionTrip: faker.datatype.boolean(),
          StrobeBmsLight: faker.datatype.boolean(),
          TripDueToOrionMessageTimeout: faker.datatype.boolean(),
        },
        Battery: {
          Alive: faker.datatype.boolean(),
          BMSRelayStatusFlags: {
            DischargeRelayEnabled: faker.datatype.boolean(),
            ChargeRelayEnabled: faker.datatype.boolean(),
            ChargerSafetyEnabled: faker.datatype.boolean(),
            MalfunctionIndicatorActive: faker.datatype.boolean(),
            MultiPurposeInputSignalStatus: faker.datatype.boolean(),
            AlwaysOnSignalStatus: faker.datatype.boolean(),
            IsReadySignalStatus: faker.datatype.boolean(),
            IsChargingSignalStatus: faker.datatype.boolean(),
          },
          PopulatedCells: faker.number.int({ min: 0, max: 100 }),
          "12vInputVoltage": faker.number.int({ min: 0, max: 100 }),
          FanVoltage: faker.number.int({ min: 0, max: 100 }),
          PackCurrent: faker.number.int({ min: 0, max: 100 }),
          PackVoltage: faker.number.int({ min: 0, max: 100 }),
          PackStateOfCharge: faker.number.int({ min: 0, max: 100 }),
          PackAmphours: faker.number.int({ min: 0, max: 100 }),
          PackDepthOfDischarge: faker.number.int({ min: 0, max: 100 }),
          HighTemperature: faker.number.int({ min: 0, max: 100 }),
          HighThermistorId: faker.number.int({ min: 0, max: 100 }),
          LowTemperature: faker.number.int({ min: 0, max: 100 }),
          LowThermistorId: faker.number.int({ min: 0, max: 100 }),
          AverageTemperature: faker.number.int({ min: 0, max: 100 }),
          InternalTemperature: faker.number.int({ min: 0, max: 100 }),
          FanSpeed: faker.number.int({ min: 0, max: 100 }),
          RequestedFanSpeed: faker.number.int({ min: 0, max: 100 }),
          LowCellVoltage: faker.number.int({ min: 0, max: 100 }),
          LowCellVoltageId: faker.number.int({ min: 0, max: 100 }),
          HighCellVoltage: faker.number.int({ min: 0, max: 100 }),
          HighCellVoltageId: faker.number.int({ min: 0, max: 100 }),
          AverageCellVoltage: faker.number.int({ min: 0, max: 100 }),
        },
        BatteryFaults: {
          ErrorFlags: {
            InternalCommunicationFault: faker.datatype.boolean(),
            InternalConversionFault: faker.datatype.boolean(),
            WeakCellFault: faker.datatype.boolean(),
            LowCellVoltageFault: faker.datatype.boolean(),
            OpenWiringFault: faker.datatype.boolean(),
            CurrentSensorFault: faker.datatype.boolean(),
            PackVoltageSensorFault: faker.datatype.boolean(),
            WeakPackFault: faker.datatype.boolean(),
            VoltageRedundancyFault: faker.datatype.boolean(),
            FanMonitorFault: faker.datatype.boolean(),
            ThermistorFault: faker.datatype.boolean(),
            CANBUSCommunicationsFault: faker.datatype.boolean(),
            AlwaysOnSupplyFault: faker.datatype.boolean(),
            HighVoltageIsolationFault: faker.datatype.boolean(),
            "12vPowerSupplyFault": faker.datatype.boolean(),
            ChargeLimitEnforcementFault: faker.datatype.boolean(),
            DischargeLimitEnforcementFault: faker.datatype.boolean(),
            ChargerSafetyRelayFault: faker.datatype.boolean(),
            InternalMemoryFault: faker.datatype.boolean(),
            InternalThermistorsFault: faker.datatype.boolean(),
            InternalLogicFault: faker.datatype.boolean(),
          },
          LimitFlags: {
            DclReducedDueToLowSoc: faker.datatype.boolean(),
            DclReducedDueToHighCellResistance: faker.datatype.boolean(),
            DclReducedDueToTemperature: faker.datatype.boolean(),
            DclReducedDueToLowCellVoltage: faker.datatype.boolean(),
            DclReducedDueToLowPackVoltage: faker.datatype.boolean(),
            DclandCclReducedDueToVoltageFailsafe: faker.datatype.boolean(),
            DclandCclReducedDueToCommunicationFailsafe:
              faker.datatype.boolean(),
            CclReducedDueToHighSoc: faker.datatype.boolean(),
            CclReducedDueToHighCellResistance: faker.datatype.boolean(),
            CclReducedDueToTemperature: faker.datatype.boolean(),
            CclReducedDueToHighCellVoltage: faker.datatype.boolean(),
            CclReducedDueToHighPackVoltage: faker.datatype.boolean(),
            CclReducedDueToChargerLatch: faker.datatype.boolean(),
            CclReducedDueToAlternateCurrentLimit: faker.datatype.boolean(),
          },
        },
        Ccs: {
          CcsAlive: faker.datatype.boolean(),
        },
        DriverControls: {
          Alive: faker.datatype.boolean(),
          HeadlightsOff: faker.datatype.boolean(),
          HeadlightsLow: faker.datatype.boolean(),
          HeadlightsHigh: faker.datatype.boolean(),
          SignalRight: faker.datatype.boolean(),
          SignalLeft: faker.datatype.boolean(),
          Hazard: faker.datatype.boolean(),
          Interior: faker.datatype.boolean(),
          Aux: faker.datatype.boolean(),
          VolumeUp: faker.datatype.boolean(),
          VolumeDown: faker.datatype.boolean(),
          NextSong: faker.datatype.boolean(),
          PrevSong: faker.datatype.boolean(),
          Acceleration: faker.number.int({ min: 0, max: 100 }),
          RegenBraking: faker.number.int({ min: 0, max: 100 }),
          Brakes: faker.datatype.boolean(),
          Forward: faker.datatype.boolean(),
          Reverse: faker.datatype.boolean(),
          PushToTalk: faker.datatype.boolean(),
          Horn: faker.datatype.boolean(),
          Reset: faker.datatype.boolean(),
          Lap: faker.datatype.boolean(),
        },
        KeyMotor: [
          {
            Alive: faker.datatype.boolean(),
            BusCurrent: faker.number.int({ min: 0, max: 100 }),
            BusVoltage: faker.number.int({ min: 0, max: 100 }),
            SetCurrent: faker.number.int({ min: 0, max: 100 }),
            SetVelocity: faker.number.int({ min: 0, max: 100 }),
            VehicleVelocity: faker.number.int({ min: 0, max: 100 }),
          },
          {
            Alive: faker.datatype.boolean(),
            BusCurrent: faker.number.int({ min: 0, max: 100 }),
            BusVoltage: faker.number.int({ min: 0, max: 100 }),
            SetCurrent: faker.number.int({ min: 0, max: 100 }),
            SetVelocity: faker.number.int({ min: 0, max: 100 }),
            VehicleVelocity: faker.number.int({ min: 0, max: 100 }),
          },
        ],
        MotorFaults: [
          {
            ErrorFlags: {
              MotorOverSpeed: faker.datatype.boolean(),
              SoftwareOverCurrent: faker.datatype.boolean(),
              DcBusOverVoltage: faker.datatype.boolean(),
              BadMotorPositionHallSequence: faker.datatype.boolean(),
              WatchdogCausedLastReset: faker.datatype.boolean(),
              ConfigReadError: faker.datatype.boolean(),
              Wail15VUnderVoltageLockOut: faker.datatype.boolean(),
              DesaturationFault: faker.datatype.boolean(),
            },
            LimitFlags: {
              OutputVoltagePwm: faker.datatype.boolean(),
              MotorCurrent: faker.datatype.boolean(),
              Velocity: faker.datatype.boolean(),
              BusCurrent: false,
              BusVoltageUpper: faker.datatype.boolean(),
              BusVoltageLower: faker.datatype.boolean(),
              IpmOrMotorTemperature: true,
            },
            RxErrorCount: faker.number.int({ min: 0, max: 100 }),
            TxErrorCount: faker.number.int({ min: 0, max: 100 }),
          },
          {
            ErrorFlags: {
              MotorOverSpeed: faker.datatype.boolean(),
              SoftwareOverCurrent: faker.datatype.boolean(),
              DcBusOverVoltage: faker.datatype.boolean(),
              BadMotorPositionHallSequence: faker.datatype.boolean(),
              WatchdogCausedLastReset: faker.datatype.boolean(),
              ConfigReadError: faker.datatype.boolean(),
              Wail15VUnderVoltageLockOut: faker.datatype.boolean(),
              DesaturationFault: faker.datatype.boolean(),
            },
            LimitFlags: {
              OutputVoltagePwm: faker.datatype.boolean(),
              MotorCurrent: faker.datatype.boolean(),
              Velocity: faker.datatype.boolean(),
              BusCurrent: false,
              BusVoltageUpper: faker.datatype.boolean(),
              BusVoltageLower: faker.datatype.boolean(),
              IpmOrMotorTemperature: true,
            },
            RxErrorCount: faker.number.int({ min: 0, max: 100 }),
            TxErrorCount: faker.number.int({ min: 0, max: 100 }),
          },
        ],
        MotorDetails: [
          {
            BackEmf: faker.number.int({ min: 0, max: 100 }),
            DcBusAmpHours: faker.number.int({ min: 0, max: 100 }),
            DspBoardTemp: faker.number.int({ min: 0, max: 100 }),
            HeatSinkTemp: faker.number.int({ min: 0, max: 100 }),
            MotorCurrentImaginary: faker.number.int({ min: 0, max: 100 }),
            MotorCurrentReal: faker.number.int({ min: 0, max: 100 }),
            MotorTemp: faker.number.int({ min: 0, max: 100 }),
            MotorVoltageImaginary: faker.number.int({ min: 0, max: 100 }),
            MotorVoltageReal: faker.number.int({ min: 0, max: 100 }),
            Odometer: faker.number.int({ min: 0, max: 100 }),
            SlipSpeed: faker.number.int({ min: 0, max: 100 }),
            PhaseBCurrent: faker.number.int({ min: 0, max: 100 }),
            PhaseCCurrent: faker.number.int({ min: 0, max: 100 }),
            VoltageRail15VSupply: faker.number.int({ min: 0, max: 100 }),
            VoltageRail1VSupply: faker.number.int({ min: 0, max: 100 }),
            VoltageRail3VSupply: faker.number.int({ min: 0, max: 100 }),
          },
          {
            BackEmf: faker.number.int({ min: 0, max: 100 }),
            DcBusAmpHours: faker.number.int({ min: 0, max: 100 }),
            DspBoardTemp: faker.number.int({ min: 0, max: 100 }),
            HeatSinkTemp: faker.number.int({ min: 0, max: 100 }),
            MotorCurrentImaginary: faker.number.int({ min: 0, max: 100 }),
            MotorCurrentReal: faker.number.int({ min: 0, max: 100 }),
            MotorTemp: faker.number.int({ min: 0, max: 100 }),
            MotorVoltageImaginary: faker.number.int({ min: 0, max: 100 }),
            MotorVoltageReal: faker.number.int({ min: 0, max: 100 }),
            Odometer: faker.number.int({ min: 0, max: 100 }),
            SlipSpeed: faker.number.int({ min: 0, max: 100 }),
            PhaseBCurrent: faker.number.int({ min: 0, max: 100 }),
            PhaseCCurrent: faker.number.int({ min: 0, max: 100 }),
            VoltageRail15VSupply: faker.number.int({ min: 0, max: 100 }),
            VoltageRail1VSupply: faker.number.int({ min: 0, max: 100 }),
            VoltageRail3VSupply: faker.number.int({ min: 0, max: 100 }),
          },
        ],
        Lights: {
          LowBeams: faker.datatype.boolean(),
          HighBeams: faker.datatype.boolean(),
          Brakes: faker.datatype.boolean(),
          LeftSignal: faker.datatype.boolean(),
          RightSignal: faker.datatype.boolean(),
          BmsStrobeLight: faker.datatype.boolean(),
          Alive: faker.datatype.boolean(),
        },
        MPPT: [
          {
            Alive: faker.datatype.boolean(),
            ArrayCurrent: faker.number.int({ min: 0, max: 100 }),
            ArrayVoltage: faker.number.int({ min: 0, max: 100 }),
            BatteryVoltage: faker.number.int({ min: 0, max: 100 }),
            Temperature: faker.number.int({ min: 0, max: 100 }),
          },
        ],
        TimeStamp: faker.number.int({ min: 0, max: 100 }),
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <packetContext.Provider value={{ currentPacket, setCurrentPacket }}>
      {children}
    </packetContext.Provider>
  );
}

export function usePacket(): IPackContextReturn {
  return useContext(packetContext);
}
