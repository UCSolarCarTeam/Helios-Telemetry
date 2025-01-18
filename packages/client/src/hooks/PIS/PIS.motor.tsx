import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";

const Motor = (): I_PIS => {
  const { currentPacket } = usePacket();
  return {
    KeyLeftMotorDetails: [
      {
        data: [
          {
            value: currentPacket?.KeyMotor?.ControlMode,
          },
        ],
        name: "Control Mode",
      },
      {
        data: [
          {
            value: currentPacket?.KeyMotor?.DebugMode,
          },
        ],
        name: "Debug Mode",
      },
      {
        data: [
          {
            value: currentPacket?.KeyMotor?.MotorMode,
          },
        ],
        name: "Motor Mode",
      },
      {
        data: [
          {
            max: 100,
            min: 20,
            value: currentPacket?.KeyMotor?.MotorSetpoint,
          },
        ],
        name: "Motor Setpoint",
      },
      {
        data: [
          {
            value: currentPacket?.KeyMotor?.SoftwareEnable,
          },
        ],
        name: "Software Enable",
      },
    ] as unknown as I_PISField[],
    LeftMotorDetails: [
      {
        data: [
          {
            max: 360,
            min: 0,
            value: currentPacket?.MotorDetails0?.AbsoluteAngle,
          },
        ],
        name: "Absolute Angle",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CanSendError,
          },
        ],
        name: "Can Send Error",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CanSendWarning,
          },
        ],
        name: "Can Send Warning",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.ControlMode,
          },
        ],
        name: "Control Mode",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.ControlValue, // int
          },
        ],
        name: "Control Value",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CpuOverload,
          },
        ],
        name: "CPU Overload",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CpuTempTooHigh,
          },
        ],
        name: "CPU Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CpuTemperatureVeryHigh,
          },
        ],
        name: "CPU Temperature Very High",
      },
      {
        data: [
          {
            unit: UnitType.WATT,
            value: currentPacket?.MotorDetails0?.CurrentMotorPower, // short int
          },
        ],
        name: "Current Motor Power",
      },
      {
        data: [
          {
            unit: UnitType.NEWTONMETERS,
            value: currentPacket?.MotorDetails0?.CurrentMotorTorque,
          },
        ],
        name: "Current Motor Torque",
      },
      {
        data: [
          {
            unit: UnitType.RPM,
            value: currentPacket?.MotorDetails0?.CurrentRpmValue,
          },
        ],
        name: "Current RPM Value",
      },
      {
        data: [
          {
            unit: "°C",
            value: currentPacket?.MotorDetails0?.MotorTemperature,
          },
        ],
        name: "Motor Temperature",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DclinkTempTooHigh,
          },
        ],
        name: "DC Link Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DclinkTemperatureVeryHigh,
          },
        ],
        name: "DC Link Temp Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DebugMode,
          },
        ],
        name: "Debug Mode",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DelayInDclinkCommunication,
          },
        ],
        name: "Delay in DC Link Communication",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DelayInReadingTempSensor,
          },
        ],
        name: "Delay in Reading Temp Sensor",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DelayInReadingPosSensor,
          },
        ],
        name: "Delay in Reading Pos Sensor",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DoubleCanIdOnBus,
          },
        ],
        name: "Double Can ID on Bus",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.HallTempTooHigh,
          },
        ],
        name: "Hall Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.HallTemperatureVeryHigh,
          },
        ],
        name: "Hall Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.HwEnableNotSet,
          },
        ],
        name: "HW Enable Not Set",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.InitError,
          },
        ],
        name: "Init Error",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.InvalidHallSector,
          },
        ],
        name: "Invalid Hall Sector",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter1TempTooHigh,
          },
        ],
        name: "Inverter 1 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter1TempVeryHigh,
          },
        ],
        name: "Inverter 1 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter2TempTooHigh,
          },
        ],
        name: "Inverter 2 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter2TempVeryHigh,
          },
        ],
        name: "Inverter 2 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter3TempTooHigh,
          },
        ],
        name: "Inverter 3 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter3TempVeryHigh,
          },
        ],
        name: "Inverter 3 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter4TempTooHigh,
          },
        ],
        name: "Inverter 4 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter4TempVeryHigh,
          },
        ],
        name: "Inverter 4 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter5TempTooHigh,
          },
        ],
        name: "Inverter 5 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter5TempVeryHigh,
          },
        ],
        name: "Inverter 5 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter6TempTooHigh,
          },
        ],
        name: "Inverter 6 Temp Too High",
      },
      {
        data: [
          {
            units: UnitType.AMPERAGE,
            value: currentPacket?.MotorDetails0?.InverterPeakCurrent,
          },
        ],
        name: "Inverter Peak Current",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorAboutToStall,
          },
        ],
        name: "Motor About to Stall",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorMode,
          },
        ],
        name: "Motor Mode ",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorStalled,
          },
        ],
        name: "Motor Stalled",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorTemperature,
          },
        ],
        name: "Motor Temperature",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.SettingsNotFound,
          },
        ],
        name: "Settings not Found",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.SoftwareEnable,
          },
        ],
        name: "Software Enable",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.StartAtHighRpm,
          },
        ],
        name: "Start at High RPM",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.TorqueLimited,
          },
        ],
        name: "Torque Limited",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.ZeroPositionOffsetNotSet,
          },
        ],
        name: "Zero Position Offset Not Set",
      },
    ] as unknown as I_PISField[],

    RightMotorDetails: [
      {
        data: [
          {
            max: 360,
            min: 0,
            value: currentPacket?.MotorDetails0?.AbsoluteAngle,
          },
        ],
        name: "Absolute Angle",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CanSendError,
          },
        ],
        name: "Can Send Error",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CanSendWarning,
          },
        ],
        name: "Can Send Warning",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.ControlMode,
          },
        ],
        name: "Control Mode",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.ControlValue, // int
          },
        ],
        name: "Control Value",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CpuOverload,
          },
        ],
        name: "CPU Overload",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CpuTempTooHigh,
          },
        ],
        name: "CPU Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.CpuTemperatureVeryHigh,
          },
        ],
        name: "CPU Temperature Very High",
      },
      {
        data: [
          {
            unit: UnitType.WATT,
            value: currentPacket?.MotorDetails0?.CurrentMotorPower, // short int
          },
        ],
        name: "Current Motor Power",
      },
      {
        data: [
          {
            unit: UnitType.NEWTONMETERS,
            value: currentPacket?.MotorDetails0?.CurrentMotorTorque,
          },
        ],
        name: "Current Motor Torque",
      },
      {
        data: [
          {
            unit: UnitType.RPM,
            value: currentPacket?.MotorDetails0?.CurrentRpmValue,
          },
        ],
        name: "Current RPM Value",
      },
      {
        data: [
          {
            unit: "°C",
            value: currentPacket?.MotorDetails0?.MotorTemperature,
          },
        ],
        name: "Motor Temperature",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DclinkTempTooHigh,
          },
        ],
        name: "DC Link Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DclinkTemperatureVeryHigh,
          },
        ],
        name: "DC Link Temp Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DebugMode,
          },
        ],
        name: "Debug Mode",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DelayInDclinkCommunication,
          },
        ],
        name: "Delay in DC Link Communication",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DelayInReadingTempSensor,
          },
        ],
        name: "Delay in Reading Temp Sensor",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DelayInReadingPosSensor,
          },
        ],
        name: "Delay in Reading Pos Sensor",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.DoubleCanIdOnBus,
          },
        ],
        name: "Double Can ID on Bus",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.HallTempTooHigh,
          },
        ],
        name: "Hall Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.HallTemperatureVeryHigh,
          },
        ],
        name: "Hall Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.HwEnableNotSet,
          },
        ],
        name: "HW Enable Not Set",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.InitError,
          },
        ],
        name: "Init Error",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.InvalidHallSector,
          },
        ],
        name: "Invalid Hall Sector",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter1TempTooHigh,
          },
        ],
        name: "Inverter 1 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter1TempVeryHigh,
          },
        ],
        name: "Inverter 1 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter2TempTooHigh,
          },
        ],
        name: "Inverter 2 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter2TempVeryHigh,
          },
        ],
        name: "Inverter 2 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter3TempTooHigh,
          },
        ],
        name: "Inverter 3 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter3TempVeryHigh,
          },
        ],
        name: "Inverter 3 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter4TempTooHigh,
          },
        ],
        name: "Inverter 4 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter4TempVeryHigh,
          },
        ],
        name: "Inverter 4 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter5TempTooHigh,
          },
        ],
        name: "Inverter 5 Temp Too High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter5TempVeryHigh,
          },
        ],
        name: "Inverter 5 Temperature Very High",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.Inverter6TempTooHigh,
          },
        ],
        name: "Inverter 6 Temp Too High",
      },
      {
        data: [
          {
            units: UnitType.AMPERAGE,
            value: currentPacket?.MotorDetails0?.InverterPeakCurrent,
          },
        ],
        name: "Inverter Peak Current",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorAboutToStall,
          },
        ],
        name: "Motor About to Stall",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorMode,
          },
        ],
        name: "Motor Mode ",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorStalled,
          },
        ],
        name: "Motor Stalled",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorTemperature,
          },
        ],
        name: "Motor Temperature",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.SettingsNotFound,
          },
        ],
        name: "Settings not Found",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.SoftwareEnable,
          },
        ],
        name: "Software Enable",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.StartAtHighRpm,
          },
        ],
        name: "Start at High RPM",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.TorqueLimited,
          },
        ],
        name: "Torque Limited",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.ZeroPositionOffsetNotSet,
          },
        ],
        name: "Zero Position Offset Not Set",
      },
    ] as unknown as I_PISField[],
  };
};

export default Motor;
