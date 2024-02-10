import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { type I_PISField } from "@/objects/PIS/PIS.interface";

const mppt = (): I_PIS => {
  const { currentPacket } = usePacket();
  return {
    Unit0: {
      Channel0: [
        {
          name: "Array Voltage",
          data: [
            {
              value: currentPacket?.MPPT[0].ArrayVoltage,
              unit: "V",
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
              value: currentPacket?.MPPT[0].ArrayCurrent,
              Unit: "A",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Voltage",
          data: [
            {
              value: currentPacket?.MPPT[0].BatteryVoltage,
              unit: "V",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Current",
          data: [
            {
              value: currentPacket?.MPPT[0].ArrayCurrent,
              unit: "V",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Temperature",
          data: [
            {
              value: currentPacket?.MPPT[0].Temperature,
              unit: "°C",
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
              value: currentPacket?.MPPT[1].ArrayVoltage,
              unit: "V",
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
              value: currentPacket?.MPPT[1].ArrayCurrent,
              unit: "A",
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
              value: currentPacket?.MPPT[1].BatteryVoltage,
              unit: "V",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Current",
          data: [
            {
              value: currentPacket?.MPPT[1].ArrayCurrent,
              unit: "V",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Temperature",
          data: [
            {
              value: currentPacket?.MPPT[1].Temperature,
              unit: "°C",
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
              value: currentPacket?.MPPT[2].ArrayVoltage,
              unit: "V",
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
              value: currentPacket?.MPPT[2].ArrayCurrent,
              Unit: "A",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Voltage",
          data: [
            {
              value: currentPacket?.MPPT[2].BatteryVoltage,
              unit: "V",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Temperature",
          data: [
            {
              value: currentPacket?.MPPT[2].Temperature,
              unit: "°C",
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
              value: currentPacket?.MPPT[3].ArrayVoltage,
              unit: "V",
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
              value: currentPacket?.MPPT[3].ArrayCurrent,
              Unit: "A",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Battery Voltage",
          data: [
            {
              value: currentPacket?.MPPT[3].BatteryVoltage,
              unit: "V",
              min: 20,
              max: 100,
            },
          ],
        },
        {
          name: "Temperature",
          data: [
            {
              value: currentPacket?.MPPT[3].Temperature,
              unit: "°C",
              min: 20,
              max: 100,
            },
          ],
        },
      ] as unknown as I_PISField[],
    },
  };
};

export default mppt;
