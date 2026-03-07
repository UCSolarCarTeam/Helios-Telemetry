import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";
import { usePacketStore } from "@/stores/usePacket";

const Motor = (): I_PIS => {
  const { currentPacket } = usePacketStore();
  const { KeyMotor, MotorDetails0, MotorDetails1 } = currentPacket;
  return {
    KeyMotorDetails: [
      {
        data: [
          {
            // max: 100,
            // min: 20,
            unit: UnitType.AMPERAGE,
            value: KeyMotor?.BusCurrentOut,
          },
        ],
        name: "Bus Current Out",
      },
      {
        data: [
          {
            unit: UnitType.SPEED,
            value: KeyMotor?.KeyMotorVelocity,
          },
        ],
        name: "Key Motor Velocity",
      },
      {
        data: [
          {
            unit: UnitType.AMPERAGE,
            value: KeyMotor?.MotorCurrent,
          },
        ],
        name: "Motor Current",
      },
    ] as unknown as I_PISField[],
    LeftMotorDetails: [
      {
        data: [{ value: MotorDetails0?.ActiveMotor }],
        name: "Active Motor",
      },
      {
        data: [{ value: MotorDetails0?.BEMF_D }],
        name: "BEMF D",
      },
      {
        data: [{ value: MotorDetails0?.BEMF_Q }],
        name: "BEMF Q",
      },
      {
        data: [{ unit: UnitType.AMPERAGE, value: MotorDetails0?.BusCurrent }],
        name: "Bus Current",
      },
      {
        data: [{ unit: UnitType.VOLTAGE, value: MotorDetails0?.BusVoltage }],
        name: "Bus Voltage",
      },
      {
        data: [{ value: MotorDetails0?.DC_Bus_Ah }],
        name: "DC Bus Ah",
      },
      {
        data: [
          { unit: UnitType.TEMP, value: MotorDetails0?.DspBoardTemperature },
        ],
        name: "DSP Board Temperature",
      },
      {
        data: [{ value: MotorDetails0?.ErrorFlags }],
        name: "Error Flags",
      },
      {
        data: [
          { unit: UnitType.TEMP, value: MotorDetails0?.HeatsinkTemperature },
        ],
        name: "Heatsink Temperature",
      },
      {
        data: [{ value: MotorDetails0?.Id }],
        name: "Id",
      },
      {
        data: [{ value: MotorDetails0?.Iq }],
        name: "Iq",
      },
      {
        data: [{ value: MotorDetails0?.LimitFlags }],
        name: "Limit Flags",
      },
      {
        data: [{ value: MotorDetails0?.MotorId }],
        name: "Motor Id",
      },
      {
        data: [{ unit: UnitType.TEMP, value: MotorDetails0?.MotorTemperature }],
        name: "Motor Temperature",
      },
      {
        data: [{ unit: UnitType.SPEED, value: MotorDetails0?.MotorVelocity }],
        name: "Motor Velocity",
      },
      {
        data: [{ value: MotorDetails0?.Odometer }],
        name: "Odometer",
      },
      {
        data: [{ value: MotorDetails0?.PhaseCurrentB }],
        name: "Phase Current B",
      },
      {
        data: [{ value: MotorDetails0?.PhaseCurrentC }],
        name: "Phase Current C",
      },
      {
        data: [{ value: MotorDetails0?.RxErrorCount }],
        name: "Rx Error Count",
      },
      {
        data: [{ value: MotorDetails0?.SerialNumber }],
        name: "Serial Number",
      },
      {
        data: [{ unit: UnitType.SPEED, value: MotorDetails0?.SlipSpeed }],
        name: "Slip Speed",
      },
      {
        data: [{ unit: UnitType.VOLTAGE, value: MotorDetails0?.Supply15V }],
        name: "Supply 15V",
      },
      {
        data: [{ unit: UnitType.VOLTAGE, value: MotorDetails0?.Supply1V9 }],
        name: "Supply 1.9V",
      },
      {
        data: [{ unit: UnitType.VOLTAGE, value: MotorDetails0?.Supply3V3 }],
        name: "Supply 3.3V",
      },
      {
        data: [{ value: MotorDetails0?.TritiumId }],
        name: "Tritium Id",
      },
      {
        data: [{ value: MotorDetails0?.TxErrorCount }],
        name: "Tx Error Count",
      },
      {
        data: [{ value: MotorDetails0?.Vd }],
        name: "Vd",
      },
      {
        data: [
          { unit: UnitType.VOLTAGE, value: MotorDetails0?.VehicleVelocity },
        ],
        name: "Vehicle Velocity",
      },
      {
        data: [{ value: MotorDetails0?.Vq }],
        name: "Vq",
      },
    ] as unknown as I_PISField[],

    MotorFaults: [
      {
        data: [
          {
            value: MotorDetails0?.ErrorFlags,
          },
        ],
        name: "Error Flag Raised In Left Motor",
      },
      {
        data: [
          {
            value: MotorDetails0?.RxErrorCount,
          },
        ],
        name: "Rx Error Raised In Left Motor",
      },
      {
        data: [
          {
            value: MotorDetails0?.TxErrorCount,
          },
        ],
        name: "Tx Error Raised In Left Motor",
      },
      {
        data: [
          {
            value: MotorDetails1?.ErrorFlags,
          },
        ],
        name: "Error Flag Raised In Right Motor",
      },
      {
        data: [
          {
            value: MotorDetails1?.RxErrorCount,
          },
        ],
        name: "Rx Error Raised In Right Motor",
      },
      {
        data: [
          {
            value: MotorDetails1?.TxErrorCount,
          },
        ],
        name: "Tx Error Raised In Right Motor",
      },
    ] as unknown as I_PISField[],

    RightMotorDetails: [
      {
        data: [{ value: MotorDetails1?.ActiveMotor }],
        name: "Active Motor",
      },
      {
        data: [{ value: MotorDetails1?.BEMF_D }],
        name: "BEMF D",
      },
      {
        data: [{ value: MotorDetails1?.BEMF_Q }],
        name: "BEMF Q",
      },
      {
        data: [{ unit: UnitType.AMPERAGE, value: MotorDetails1?.BusCurrent }],
        name: "Bus Current",
      },
      {
        data: [{ unit: UnitType.VOLTAGE, value: MotorDetails1?.BusVoltage }],
        name: "Bus Voltage",
      },
      {
        data: [{ value: MotorDetails1?.DC_Bus_Ah }],
        name: "DC Bus Ah",
      },
      {
        data: [
          { unit: UnitType.TEMP, value: MotorDetails1?.DspBoardTemperature },
        ],
        name: "DSP Board Temperature",
      },
      {
        data: [{ value: MotorDetails1?.ErrorFlags }],
        name: "Error Flags",
      },
      {
        data: [
          { unit: UnitType.TEMP, value: MotorDetails1?.HeatsinkTemperature },
        ],
        name: "Heatsink Temperature",
      },
      {
        data: [{ value: MotorDetails1?.Id }],
        name: "Id",
      },
      {
        data: [{ value: MotorDetails1?.Iq }],
        name: "Iq",
      },
      {
        data: [{ value: MotorDetails1?.LimitFlags }],
        name: "Limit Flags",
      },
      {
        data: [{ value: MotorDetails1?.MotorId }],
        name: "Motor Id",
      },
      {
        data: [{ unit: UnitType.TEMP, value: MotorDetails1?.MotorTemperature }],
        name: "Motor Temperature",
      },
      {
        data: [{ unit: UnitType.SPEED, value: MotorDetails1?.MotorVelocity }],
        name: "Motor Velocity",
      },
      {
        data: [{ value: MotorDetails1?.Odometer }],
        name: "Odometer",
      },
      {
        data: [{ value: MotorDetails1?.PhaseCurrentB }],
        name: "Phase Current B",
      },
      {
        data: [{ value: MotorDetails1?.PhaseCurrentC }],
        name: "Phase Current C",
      },
      {
        data: [{ value: MotorDetails1?.RxErrorCount }],
        name: "Rx Error Count",
      },
      {
        data: [{ value: MotorDetails1?.SerialNumber }],
        name: "Serial Number",
      },
      {
        data: [{ unit: UnitType.SPEED, value: MotorDetails1?.SlipSpeed }],
        name: "Slip Speed",
      },
      {
        data: [{ unit: UnitType.VOLTAGE, value: MotorDetails1?.Supply15V }],
        name: "Supply 15V",
      },
      {
        data: [{ unit: UnitType.VOLTAGE, value: MotorDetails1?.Supply1V9 }],
        name: "Supply 1.9V",
      },
      {
        data: [{ unit: UnitType.VOLTAGE, value: MotorDetails1?.Supply3V3 }],
        name: "Supply 3.3V",
      },
      {
        data: [{ value: MotorDetails1?.TritiumId }],
        name: "Tritium Id",
      },
      {
        data: [{ value: MotorDetails1?.TxErrorCount }],
        name: "Tx Error Count",
      },
      {
        data: [{ value: MotorDetails1?.Vd }],
        name: "Vd",
      },
      {
        data: [
          { unit: UnitType.VOLTAGE, value: MotorDetails1?.VehicleVelocity },
        ],
        name: "Vehicle Velocity",
      },
      {
        data: [{ value: MotorDetails1?.Vq }],
        name: "Vq",
      },
    ] as unknown as I_PISField[],
  };
};

export default Motor;
