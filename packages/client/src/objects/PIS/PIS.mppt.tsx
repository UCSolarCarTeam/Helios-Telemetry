import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField, UnitType } from "@/objects/PIS/PIS.interface";

const MPPT = (): I_PIS => {
  const { currentPacket } = usePacket();
  const data = {
    Unit0: {
      Channel0: [
        {
          name: "Array Voltage",
          data: [
            {
              value: currentPacket?.MPPT[0]?.ArrayVoltage,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
              hover: "Unit 0 Channel 0 Array Voltage ",
            },
          ],
        },
        {
          name: "Array Current",
          data: [
            {
              value: currentPacket?.MPPT[0]?.ArrayCurrent,
              Unit: UnitType.AMPERAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Voltage",
          data: [
            {
              value: currentPacket?.MPPT[0]?.BatteryVoltage,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Current",
          data: [
            {
              value: currentPacket?.MPPT[0]?.ArrayCurrent,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Temperature",
          data: [
            {
              value: currentPacket?.MPPT[0]?.Temperature,
              unit: UnitType.TEMP,
              min: 20,
              max: 100,
            },
          ],
        },
      ] as unknown as I_PISField[],
      Channel1: [
        {
          name: "Array Voltage",
          data: [
            {
              value: currentPacket?.MPPT[1]?.ArrayVoltage,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
              hover: "Unit 0 Channel 0 Array Voltage ",
            },
          ],
        },
        {
          name: "Array Current",
          data: [
            {
              value: currentPacket?.MPPT[1]?.ArrayCurrent,
              unit: UnitType.AMPERAGE,
              min: 20,
              max: 100,
              hover: "Unit 0 Channel 1 Array Current ",
            },
          ],
        },
        {
          name: "Battery Voltage",
          data: [
            {
              value: currentPacket?.MPPT[1]?.BatteryVoltage,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Current",
          data: [
            {
              value: currentPacket?.MPPT[1]?.ArrayCurrent,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Temperature",
          data: [
            {
              value: currentPacket?.MPPT[1]?.Temperature,
              unit: UnitType.TEMP,
              min: 20,
              max: 100,
            },
          ],
        },
      ] as unknown as I_PISField[],
    },
    Unit1: {
      Channel0: [
        {
          name: "Array Voltage",
          data: [
            {
              value: currentPacket?.MPPT[2]?.ArrayVoltage,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
              hover: "Unit 0 Channel 0 Array Voltage ",
            },
          ],
        },
        {
          name: "Array Current",
          data: [
            {
              value: currentPacket?.MPPT[2]?.ArrayCurrent,
              Unit: UnitType.AMPERAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Voltage",
          data: [
            {
              value: currentPacket?.MPPT[2]?.BatteryVoltage,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Temperature",
          data: [
            {
              value: currentPacket?.MPPT[2]?.Temperature,
              unit: UnitType.TEMP,
              min: 20,
              max: 100,
            },
          ],
        },
      ] as unknown as I_PISField[],
      Channel1: [
        {
          name: "Array Voltage",
          data: [
            {
              value: currentPacket?.MPPT[3]?.ArrayVoltage,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
              hover: "Unit 0 Channel 0 Array Voltage ",
            },
          ],
        },
        {
          name: "Array Current",
          data: [
            {
              value: currentPacket?.MPPT[3]?.ArrayCurrent,
              Unit: UnitType.AMPERAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Voltage",
          data: [
            {
              value: currentPacket?.MPPT[3]?.BatteryVoltage,
              unit: UnitType.VOLTAGE,
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Temperature",
          data: [
            {
              value: currentPacket?.MPPT[3]?.Temperature,
              unit: UnitType.TEMP,
              min: 20,
              max: 100,
            },
          ],
        },
      ] as unknown as I_PISField[],
    },
  };

  return data;
};

export default MPPT;
