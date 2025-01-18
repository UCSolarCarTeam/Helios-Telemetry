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
              value: currentPacket?.MPPT0?.ArrayVoltage,
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
              value: currentPacket?.MPPT0?.ArrayCurrent,
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
              value: currentPacket?.MPPT0?.BatteryVoltage,
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
              value: currentPacket?.MPPT0?.Temperature,
            },
          ],
          name: "Temperature",
        },
        {
          data: [
            {
              max: 100, // ???? coould be like 0 1 2 3 idk
              min: 20,
              value: currentPacket?.MPPT0?.ChannelNumber,
            },
          ],
          name: "Channel Number",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              value: currentPacket?.MPPT0?.IsAlive,
            },
          ],
          name: "Is Alive",
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
              value: currentPacket?.MPPT1?.ArrayVoltage,
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
              value: currentPacket?.MPPT1?.ArrayCurrent,
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
              value: currentPacket?.MPPT1?.BatteryVoltage,
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
              value: currentPacket?.MPPT1?.Temperature,
            },
          ],
          name: "Temperature",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              value: currentPacket?.MPPT1?.ChannelNumber,
            },
          ],
          name: "Channel Number",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              value: currentPacket?.MPPT1?.IsAlive,
            },
          ],
          name: "Is Alive",
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
              value: currentPacket?.MPPT2?.ArrayVoltage,
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
              value: currentPacket?.MPPT2?.ArrayCurrent,
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
              value: currentPacket?.MPPT2?.BatteryVoltage,
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
              value: currentPacket?.MPPT2?.Temperature,
            },
          ],
          name: "Temperature",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              value: currentPacket?.MPPT2?.ChannelNumber,
            },
          ],
          name: "Channel Number",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              value: currentPacket?.MPPT2?.IsAlive,
            },
          ],
          name: "Is Alive",
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
              value: currentPacket?.MPPT3?.ArrayVoltage,
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
              value: currentPacket?.MPPT3?.ArrayCurrent,
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
              value: currentPacket?.MPPT3?.BatteryVoltage,
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
              value: currentPacket?.MPPT3?.Temperature,
            },
          ],
          name: "Temperature",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              value: currentPacket?.MPPT3?.ChannelNumber,
            },
          ],
          name: "Channel Number",
        },
        {
          data: [
            {
              max: 100,
              min: 20,
              value: currentPacket?.MPPT3?.IsAlive,
            },
          ],
          name: "Is Alive",
        },
      ] as unknown as I_PISField[],
    },
  };

  return data;
};

export default MPPT;
