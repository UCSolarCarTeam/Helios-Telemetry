import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField, UnitType } from "@/objects/PIS/PIS.interface";

const MPPT = (): I_PIS => {
  const { currentPacket } = usePacket();
  const { MPPT } = currentPacket;
  const data = {
    Unit0: {
      Channel0: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt0Ch0ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              Unit: UnitType.AMPERAGE,
              max: 100,
              min: 20,
              value: MPPT.Mppt0Ch0ArrayCurrent,
            },
          ],
          name: "Array Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt0Ch0BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: MPPT.Mppt0Ch0UnitTemperature,
            },
          ],
          name: "Temperature",
        },
      ] as unknown as I_PISField[],
      Channel1: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage ",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt0Ch1ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              Unit: UnitType.AMPERAGE,
              max: 100,
              min: 20,
              value: MPPT.Mppt0Ch1ArrayCurrent,
            },
          ],
          name: "Array Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt0Ch1BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: MPPT.Mppt0Ch1UnitTemperature,
            },
          ],
          name: "Temperature",
        },
      ] as unknown as I_PISField[],
    },
    Unit1: {
      Channel0: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage ",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt1Ch0ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              Unit: UnitType.AMPERAGE,
              max: 100,
              min: 20,
              value: MPPT.Mppt1Ch0ArrayCurrent,
            },
          ],
          name: "Array Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt1Ch0BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: MPPT.Mppt1Ch0UnitTemperature,
            },
          ],
          name: "Temperature",
        },
      ] as unknown as I_PISField[],
      Channel1: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage ",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt1Ch1ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              Unit: UnitType.AMPERAGE,
              max: 100,
              min: 20,
              value: MPPT.Mppt1Ch1ArrayCurrent,
            },
          ],
          name: "Array Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt1Ch1BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: MPPT.Mppt1Ch1UnitTemperature,
            },
          ],
          name: "Temperature",
        },
      ] as unknown as I_PISField[],
    },
    Unit2: {
      Channel0: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage ",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt2Ch0ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              Unit: UnitType.AMPERAGE,
              max: 100,
              min: 20,
              value: MPPT.Mppt2Ch0ArrayCurrent,
            },
          ],
          name: "Array Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt2Ch0BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: MPPT.Mppt2Ch0UnitTemperature,
            },
          ],
          name: "Temperature",
        },
      ] as unknown as I_PISField[],
      Channel1: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage ",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt2Ch1ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              Unit: UnitType.AMPERAGE,
              max: 100,
              min: 20,
              value: MPPT.Mppt2Ch1ArrayCurrent,
            },
          ],
          name: "Array Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt2Ch1BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: MPPT.Mppt2Ch1UnitTemperature,
            },
          ],
          name: "Temperature",
        },
      ] as unknown as I_PISField[],
    },
    Unit3: {
      Channel0: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage ",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt3Ch0ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              Unit: UnitType.AMPERAGE,
              max: 100,
              min: 20,
              value: MPPT.Mppt3Ch0ArrayCurrent,
            },
          ],
          name: "Array Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt3Ch0BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: MPPT.Mppt3Ch0UnitTemperature,
            },
          ],
          name: "Temperature",
        },
      ] as unknown as I_PISField[],
      Channel1: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage ",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt3Ch1ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              Unit: UnitType.AMPERAGE,
              max: 100,
              min: 20,
              value: MPPT.Mppt3Ch1ArrayCurrent,
            },
          ],
          name: "Array Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: MPPT.Mppt3Ch1BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: MPPT.Mppt3Ch1UnitTemperature,
            },
          ],
          name: "Temperature",
        },
      ] as unknown as I_PISField[],
    },
  };

  return data;
};

export default MPPT;
