import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";
import { UnitType } from "@/objects/PIS/PIS.interface";

const Motor = (): I_PIS => {
  const { currentPacket } = usePacket();
  return {
    Key_Left_Motor_Details: [
      {
        data: [
          {
            value: currentPacket?.KeyMotor[0]?.Alive,
          },
        ],
        name: "Alive",
      },
      {
        data: [
          {
            unit: "%",
            value: currentPacket?.KeyMotor[0]?.SetCurrent,
          },
        ],
        name: "Set Current",
      },
      {
        data: [
          {
            unit: UnitType.RPM,
            value: currentPacket?.KeyMotor[0]?.SetVelocity,
          },
        ],
        name: "Set Velocity",
      },
      {
        data: [
          {
            unit: UnitType.AMPERAGE,
            value: currentPacket?.KeyMotor[0]?.BusCurrent,
          },
        ],
        name: "Bus Current",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.KeyMotor[0]?.BusVoltage,
          },
        ],
        name: "Bus Voltage",
      },
      {
        data: [
          {
            unit: UnitType.SPEED,
            value: currentPacket?.KeyMotor[0]?.VehicleVelocity,
          },
        ],
        name: "Vehicle Velocity",
      },
    ] as unknown as I_PISField[],
    Key_Right_Motor_Details: [
      {
        data: [
          {
            value: currentPacket?.KeyMotor[1]?.Alive,
          },
        ],
        name: "Alive",
      },
      {
        data: [
          {
            unit: "%",
            value: currentPacket?.KeyMotor[1]?.SetCurrent,
          },
        ],
        name: "Set Current",
      },
      {
        data: [
          {
            unit: UnitType.RPM,
            value: currentPacket?.KeyMotor[1]?.SetVelocity,
          },
        ],
        name: "Set Velocity",
      },
      {
        data: [
          {
            unit: UnitType.AMPERAGE,
            value: currentPacket?.KeyMotor[1]?.BusCurrent,
          },
        ],
        name: "Bus Current",
      },
      {
        data: [
          {
            unit: UnitType.AMPERAGE,
            value: currentPacket?.KeyMotor[1]?.BusVoltage,
          },
        ],
        name: "Bus Voltage",
      },
      {
        data: [
          {
            unit: UnitType.SPEED,
            value: currentPacket?.KeyMotor[1]?.VehicleVelocity,
          },
        ],
        name: "Vehicle Velocity",
      },
    ] as unknown as I_PISField[],
    Left_Motor_Details: [
      {
        data: [
          {
            unit: UnitType.AMPRMS,
            value: currentPacket?.MotorDetails[0]?.PhaseCCurrent,
          },
        ],
        name: "Phase C Current",
      },
      {
        data: [
          {
            unit: UnitType.AMPRMS,
            value: currentPacket?.MotorDetails[0]?.PhaseBCurrent,
          },
        ],
        name: "Phase B Current",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[0]?.MotorVoltageReal,
          },
        ],
        name: "Motor Voltage Real",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[0]?.MotorVoltageImaginary,
          },
        ],
        name: "Motor Voltage Imaginary",
      },
      {
        data: [
          {
            unit: UnitType.AMPERAGE,
            value: currentPacket?.MotorDetails[0]?.MotorCurrentReal,
          },
        ],
        name: "Motor Current Real",
      },
      {
        data: [
          {
            unit: UnitType.AMPERAGE,
            value: currentPacket?.MotorDetails[0]?.MotorVoltageImaginary,
          },
        ],
        name: "Motor Current Imaginary",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[0]?.BackEmf,
          },
        ],
        name: "Back EMF",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[0]?.VoltageRail15VSupply,
          },
        ],
        name: "Voltage Rail 15V",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[0]?.VoltageRail3VSupply,
          },
        ],
        name: "Voltage Rail 3V",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[0]?.VoltageRail1VSupply,
          },
        ],
        name: "Voltage Rail 1V",
      },
      {
        data: [
          {
            unit: UnitType.TEMP,
            value: currentPacket?.MotorDetails[0]?.HeatSinkTemp,
          },
        ],
        name: "Heat Sink Temp",
      },
      {
        data: [
          {
            unit: "°C",
            value: currentPacket?.MotorDetails[0]?.MotorTemp,
          },
        ],
        name: "Motor Temp",
      },
      {
        data: [
          {
            unit: "°C",
            value: currentPacket?.MotorDetails[0]?.DspBoardTemp,
          },
        ],
        name: "DSP Board Temp",
      },
      {
        data: [
          {
            unit: "Ah",
            value: currentPacket?.MotorDetails[0]?.DcBusAmpHours,
          },
        ],
        name: "Dc Bus Amp Hours",
      },
      {
        data: [
          {
            unit: "m",
            value: currentPacket?.MotorDetails[0]?.Odometer,
          },
        ],
        name: "Odometer",
      },
      {
        data: [
          {
            unit: UnitType.HERTZ,
            value: currentPacket?.MotorDetails[0]?.SlipSpeed,
          },
        ],
        name: "Slip Speed",
      },
    ] as unknown as I_PISField[],
    Right_Motor_Details: [
      {
        data: [
          {
            unit: UnitType.AMPRMS,
            value: currentPacket?.MotorDetails[1]?.PhaseCCurrent,
          },
        ],
        name: "Phase C Current",
      },
      {
        data: [
          {
            unit: UnitType.AMPRMS,
            value: currentPacket?.MotorDetails[1]?.PhaseBCurrent,
          },
        ],
        name: "Phase B Current",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[1]?.MotorVoltageReal,
          },
        ],
        name: "Motor Voltage Real",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[1]?.MotorVoltageImaginary,
          },
        ],
        name: "Motor Voltage Imaginary",
      },
      {
        data: [
          {
            unit: UnitType.AMPERAGE,
            value: currentPacket?.MotorDetails[1]?.MotorCurrentReal,
          },
        ],
        name: "Motor Current Real",
      },
      {
        data: [
          {
            unit: UnitType.AMPERAGE,
            value: currentPacket?.MotorDetails[1]?.MotorVoltageImaginary,
          },
        ],
        name: "Motor Current Imaginary",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[1]?.BackEmf,
          },
        ],
        name: "Back EMF",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[1]?.VoltageRail15VSupply,
          },
        ],
        name: "Voltage Rail 15V",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[1]?.VoltageRail3VSupply,
          },
        ],
        name: "Voltage Rail 3V",
      },
      {
        data: [
          {
            unit: UnitType.VOLTAGE,
            value: currentPacket?.MotorDetails[1]?.VoltageRail1VSupply,
          },
        ],
        name: "Voltage Rail 1V",
      },
      {
        data: [
          {
            unit: UnitType.TEMP,
            value: currentPacket?.MotorDetails[1]?.HeatSinkTemp,
          },
        ],
        name: "Heat Sink Temp",
      },
      {
        data: [
          {
            unit: UnitType.TEMP,
            value: currentPacket?.MotorDetails[1]?.MotorTemp,
          },
        ],
        name: "Motor Temp",
      },
      {
        data: [
          {
            unit: UnitType.TEMP,
            value: currentPacket?.MotorDetails[1]?.DspBoardTemp,
          },
        ],
        name: "DSP Board Temp",
      },
      {
        data: [
          {
            unit: UnitType.AMPHOUR,
            value: currentPacket?.MotorDetails[1]?.DcBusAmpHours,
          },
        ],
        name: "Dc Bus Amp Hours",
      },
      {
        data: [
          {
            unit: UnitType.DISTANCE,
            value: currentPacket?.MotorDetails[1]?.Odometer,
          },
        ],
        name: "Odometer",
      },
      {
        data: [
          {
            unit: UnitType.HERTZ,
            value: currentPacket?.MotorDetails[1]?.SlipSpeed,
          },
        ],
        name: "Slip Speed",
      },
    ] as unknown as I_PISField[],
  };
};

export default Motor;
