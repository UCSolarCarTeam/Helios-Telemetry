import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField, UnitType } from "@/objects/PIS/PIS.interface";

const MPPT = (): I_PIS => {
  const { currentPacket } = usePacket();
  const data = {
    Unit0: {
      Channel0: [
        {
          data: [
            {
              hover: "Unit 0 Channel 0 Array Voltage ",
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: currentPacket?.MPPT[0]?.ArrayVoltage,
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
              value: currentPacket?.MPPT[0]?.ArrayCurrent,
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
              value: currentPacket?.MPPT[0]?.BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: currentPacket?.MPPT[0]?.ArrayCurrent,
            },
          ],
          name: "Battery Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: currentPacket?.MPPT[0]?.Temperature,
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
              value: currentPacket?.MPPT[1]?.ArrayVoltage,
            },
          ],
          name: "Array Voltage",
        },
        {
          data: [
            {
              hover: "Unit 0 Channel 1 Array Current ",
              max: 100,
              min: 20,
              unit: UnitType.AMPERAGE,
              value: currentPacket?.MPPT[1]?.ArrayCurrent,
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
              value: currentPacket?.MPPT[1]?.BatteryVoltage,
            },
          ],
          name: "Battery Voltage",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.VOLTAGE,
              value: currentPacket?.MPPT[1]?.ArrayCurrent,
            },
          ],
          name: "Battery Current",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              unit: UnitType.TEMP,
              value: currentPacket?.MPPT[1]?.Temperature,
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
              value: currentPacket?.MPPT[2]?.ArrayVoltage,
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
              value: currentPacket?.MPPT[2]?.ArrayCurrent,
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
              value: currentPacket?.MPPT[2]?.BatteryVoltage,
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
              value: currentPacket?.MPPT[2]?.Temperature,
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
              value: currentPacket?.MPPT[3]?.ArrayVoltage,
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
              value: currentPacket?.MPPT[3]?.ArrayCurrent,
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
              value: currentPacket?.MPPT[3]?.BatteryVoltage,
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
              value: currentPacket?.MPPT[3]?.Temperature,
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
