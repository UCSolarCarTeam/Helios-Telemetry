import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";

const Motor = (): I_PIS => {
  const { currentPacket } = usePacket();
  return {
    Key_Left_Motor_Details: [
      {
        name: "Alive",
        data: [
          {
            value: currentPacket?.KeyMotor[0].Alive,
          },
        ],
      },
      {
        name: "Set Current",
        data: [
          {
            value: currentPacket?.KeyMotor[0].SetCurrent,
            unit: "%",
          },
        ],
      },
      {
        name: "Set Velocity",
        data: [
          {
            value: currentPacket?.KeyMotor[0].SetVelocity,
            unit: "RPM",
          },
        ],
      },
      {
        name: "Bus Current",
        data: [
          {
            value: currentPacket?.KeyMotor[0].BusCurrent,
            unit: "A",
          },
        ],
      },
      {
        name: "Bus Voltage",
        data: [
          {
            value: currentPacket?.KeyMotor[0].BusVoltage,
            unit: "V",
          },
        ],
      },
      {
        name: "Vehicle Velocity",
        data: [
          {
            value: currentPacket?.KeyMotor[0].VehicleVelocity,
            unit: "m/s",
          },
        ],
      },
    ] as unknown as I_PISField[],
    Key_Right_Motor_Details: [
      {
        name: "Alive",
        data: [
          {
            value: currentPacket?.KeyMotor[1].Alive,
          },
        ],
      },
      {
        name: "Set Current",
        data: [
          {
            value: currentPacket?.KeyMotor[1].SetCurrent,
            unit: "%",
          },
        ],
      },
      {
        name: "Set Velocity",
        data: [
          {
            value: currentPacket?.KeyMotor[1].SetVelocity,
            unit: "RPM",
          },
        ],
      },
      {
        name: "Bus Current",
        data: [
          {
            value: currentPacket?.KeyMotor[1].BusCurrent,
            unit: "A",
          },
        ],
      },
      {
        name: "Bus Voltage",
        data: [
          {
            value: currentPacket?.KeyMotor[1].BusVoltage,
            unit: "V",
          },
        ],
      },
      {
        name: "Vehicle Velocity",
        data: [
          {
            value: currentPacket?.KeyMotor[1].VehicleVelocity,
            unit: "m/s",
          },
        ],
      },
    ] as unknown as I_PISField[],
    Left_Motor_Details: [
      {
        name: "Phase C Current",
        data: [
          {
            value: currentPacket?.MotorDetails[0].PhaseCCurrent,
            unit: "A(rms)",
          },
        ],
      },
      {
        name: "Phase B Current",
        data: [
          {
            value: currentPacket?.MotorDetails[0].PhaseBCurrent,
            unit: "A(rms)",
          },
        ],
      },
      {
        name: "Motor Voltage Real",
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorVoltageReal,
            unit: "V",
          },
        ],
      },
      {
        name: "Motor Voltage Imaginary",
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorVoltageImaginary,
            unit: "V",
          },
        ],
      },
      {
        name: "Motor Current Real",
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorCurrentReal,
            unit: "A",
          },
        ],
      },
      {
        name: "Motor Current Imaginary",
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorVoltageImaginary,
            unit: "A",
          },
        ],
      },
      {
        name: "Back EMF",
        data: [
          {
            value: currentPacket?.MotorDetails[0].BackEmf,
            unit: "V",
          },
        ],
      },
      {
        name: "Voltage Rail 15V",
        data: [
          {
            value: currentPacket?.MotorDetails[0].VoltageRail15VSupply,
            unit: "V",
          },
        ],
      },
      {
        name: "Voltage Rail 3V",
        data: [
          {
            value: currentPacket?.MotorDetails[0].VoltageRail3VSupply,
            unit: "V",
          },
        ],
      },
      {
        name: "Voltage Rail 1V",
        data: [
          {
            value: currentPacket?.MotorDetails[0].VoltageRail1VSupply,
            unit: "V",
          },
        ],
      },
      {
        name: "Heat Sink Temp",
        data: [
          {
            value: currentPacket?.MotorDetails[0].HeatSinkTemp,
            unit: "°C",
          },
        ],
      },
      {
        name: "Motor Temp",
        data: [
          {
            value: currentPacket?.MotorDetails[0].MotorTemp,
            unit: "°C",
          },
        ],
      },
      {
        name: "DSP Board Temp",
        data: [
          {
            value: currentPacket?.MotorDetails[0].DspBoardTemp,
            unit: "°C",
          },
        ],
      },
      {
        name: "Dc Bus Amp Hours",
        data: [
          {
            value: currentPacket?.MotorDetails[0].DcBusAmpHours,
            unit: "Ah", //check
          },
        ],
      },
      {
        name: "Odometer",
        data: [
          {
            value: currentPacket?.MotorDetails[0].Odometer,
            unit: "m",
          },
        ],
      },
      {
        name: "Slip Speed",
        data: [
          {
            value: currentPacket?.MotorDetails[0].SlipSpeed,
            unit: "Hz",
          },
        ],
      },
    ] as unknown as I_PISField[],
    Right_Motor_Details: [
      {
        name: "Phase C Current",
        data: [
          {
            value: currentPacket?.MotorDetails[1].PhaseCCurrent,
            unit: "A(rms)",
          },
        ],
      },
      {
        name: "Phase B Current",
        data: [
          {
            value: currentPacket?.MotorDetails[1].PhaseBCurrent,
            unit: "A(rms)",
          },
        ],
      },
      {
        name: "Motor Voltage Real",
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorVoltageReal,
            unit: "V",
          },
        ],
      },
      {
        name: "Motor Voltage Imaginary",
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorVoltageImaginary,
            unit: "V",
          },
        ],
      },
      {
        name: "Motor Current Real",
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorCurrentReal,
            unit: "A",
          },
        ],
      },
      {
        name: "Motor Current Imaginary",
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorVoltageImaginary,
            unit: "A",
          },
        ],
      },
      {
        name: "Back EMF",
        data: [
          {
            value: currentPacket?.MotorDetails[1].BackEmf,
            unit: "V",
          },
        ],
      },
      {
        name: "Voltage Rail 15V",
        data: [
          {
            value: currentPacket?.MotorDetails[1].VoltageRail15VSupply,
            unit: "V",
          },
        ],
      },
      {
        name: "Voltage Rail 3V",
        data: [
          {
            value: currentPacket?.MotorDetails[1].VoltageRail3VSupply,
            unit: "V",
          },
        ],
      },
      {
        name: "Voltage Rail 1V",
        data: [
          {
            value: currentPacket?.MotorDetails[1].VoltageRail1VSupply,
            unit: "V",
          },
        ],
      },
      {
        name: "Heat Sink Temp",
        data: [
          {
            value: currentPacket?.MotorDetails[1].HeatSinkTemp,
            unit: "°C",
          },
        ],
      },
      {
        name: "Motor Temp",
        data: [
          {
            value: currentPacket?.MotorDetails[1].MotorTemp,
            unit: "°C",
          },
        ],
      },
      {
        name: "DSP Board Temp",
        data: [
          {
            value: currentPacket?.MotorDetails[1].DspBoardTemp,
            unit: "°C",
          },
        ],
      },
      {
        name: "Dc Bus Amp Hours",
        data: [
          {
            value: currentPacket?.MotorDetails[1].DcBusAmpHours,
            unit: "Ah",
          },
        ],
      },
      {
        name: "Odometer",
        data: [
          {
            value: currentPacket?.MotorDetails[1].Odometer,
            unit: "m",
          },
        ],
      },
      {
        name: "Slip Speed",
        data: [
          {
            value: currentPacket?.MotorDetails[1].SlipSpeed,
            unit: "Hz",
          },
        ],
      },
    ] as unknown as I_PISField[],
  };
};

export default Motor;
