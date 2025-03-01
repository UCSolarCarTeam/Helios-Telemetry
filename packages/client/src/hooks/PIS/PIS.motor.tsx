import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";

const Motor = (): I_PIS => {
  const { currentPacket } = usePacket();
  return {
    KeyMotorDetails: [
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
            value: currentPacket?.MotorDetails0?.ControlValue, // int
          },
        ],
        name: "Control Value",
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
            units: UnitType.AMPERAGE,
            value: currentPacket?.MotorDetails0?.InverterPeakCurrent,
          },
        ],
        name: "Inverter Peak Current",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails0?.MotorTemperature,
          },
        ],
        name: "Motor Temperature",
      },
    ] as unknown as I_PISField[],

    RightMotorDetails: [
      {
        data: [
          {
            max: 360,
            min: 0,
            value: currentPacket?.MotorDetails1?.AbsoluteAngle,
          },
        ],
        name: "Absolute Angle",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails1?.ControlValue, // int
          },
        ],
        name: "Control Value",
      },
      {
        data: [
          {
            unit: UnitType.WATT,
            value: currentPacket?.MotorDetails1?.CurrentMotorPower, // short int
          },
        ],
        name: "Current Motor Power",
      },
      {
        data: [
          {
            unit: UnitType.NEWTONMETERS,
            value: currentPacket?.MotorDetails1?.CurrentMotorTorque,
          },
        ],
        name: "Current Motor Torque",
      },
      {
        data: [
          {
            unit: UnitType.RPM,
            value: currentPacket?.MotorDetails1?.CurrentRpmValue,
          },
        ],
        name: "Current RPM Value",
      },
      {
        data: [
          {
            unit: "°C",
            value: currentPacket?.MotorDetails1?.MotorTemperature,
          },
        ],
        name: "Motor Temperature",
      },
      {
        data: [
          {
            units: UnitType.AMPERAGE,
            value: currentPacket?.MotorDetails1?.InverterPeakCurrent,
          },
        ],
        name: "Inverter Peak Current",
      },
      {
        data: [
          {
            value: currentPacket?.MotorDetails1?.MotorTemperature,
          },
        ],
        name: "Motor Temperature",
      },
    ] as unknown as I_PISField[],
  };
};

export default Motor;
