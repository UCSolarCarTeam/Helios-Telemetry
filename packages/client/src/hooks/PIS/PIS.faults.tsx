import {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import { usePacket } from "@/contexts/PacketContext";
import type I_PIS from "@/objects/PIS/PIS.interface";

const Faults = (): I_PIS => {
  const { currentPacket } = usePacket();
  const data = {
    BatteryFaults: {
      ErrorFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.InternalCommunicationFault,
            },
          ],
          isFault: true,
          name: "Internal Communication Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Errors.InternalConversionFault,
            },
          ],
          isFault: true,
          name: "Internal Conversion Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.Errors.WeakCellFault,
            },
          ],
          isFault: true,
          name: "Weak Cell Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.LowCellVoltageFault,
            },
          ],
          isFault: true,
          name: "Low Cell Voltage Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.OpenWiringFault,
            },
          ],
          isFault: true,
          name: "Open Wiring Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.Errors.CurrentSensorFault,
            },
          ],
          isFault: true,
          name: "Current Sensor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.Errors.PackVoltageSensorFault,
            },
          ],
          isFault: true,
          name: "Pack Voltage Sensor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.Errors.WeakPackFault,
            },
          ],
          isFault: true,
          name: "Weak Pack Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.VoltageRedundancyFault,
            },
          ],
          isFault: true,
          name: "Voltage Redundancy Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value: currentPacket?.BatteryFaults.Errors.FanMonitorFault,
            },
          ],
          isFault: true,
          name: "Fan Monitor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.ThermistorFault,
            },
          ],
          isFault: true,
          name: "Thermistor Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.CanbusCommunicationFault,
            },
          ],
          isFault: true,
          name: "CANBUS Communications Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.AlwaysOnSupplyFault,
            },
          ],
          isFault: true,
          name: "Always On Supply Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.HighVoltageIsolationFault,
            },
          ],
          isFault: true,
          name: "High Voltage Isolation Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.PowerSupply12VFault,
            },
          ],
          isFault: true,
          name: "12V Power Supply Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.ChargeLimitEnforcementFault,
            },
          ],
          isFault: true,
          name: "Charge Limit Enforcement Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.ChargerSafetyRelayFault,
            },
          ],
          isFault: true,
          name: "Charge Safety Relay Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors
                  .DischargeLimitEnforcementFault,
            },
          ],
          isFault: true,
          name: "Discharge Limit Enforcement Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Errors.ChargerSafetyRelayFault,
            },
          ],
          isFault: true,
          name: "Charger Safety Relay Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.InternalMemoryFault,
            },
          ],
          isFault: true,
          name: "Internal Memory Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Errors.InternalThermistorFault,
            },
          ],
          isFault: true,
          name: "Internal Thermistors Fault",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value: currentPacket?.BatteryFaults.Errors.InternalLogicFault,
            },
          ],
          isFault: true,
          name: "Internal Logic Fault",
        },
      ],
      WarningFlags: [
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Warnings.DclReducedDueToLowSoc,
            },
          ],
          isFault: true,
          name: "Dcl Reduced Due To Low Soc",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToHighCellResistance,
            },
          ],
          isFault: true,
          name: "Dcl Reduced Due to HighCell Resistance",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToTemperature,
            },
          ],
          isFault: true,
          name: "Dcl Reduced Due to Temperature",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToLowCellVoltage,
            },
          ],
          isFault: true,
          name: "Dcl Reduced Due to Low Cell Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclReducedDueToLowPackVoltage,
            },
          ],
          isFault: true,
          name: "Dcl Reduced Due to Low Pack Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclAndCclReducedDueToVoltageFailsafe,
            },
          ],
          isFault: true,
          name: "Dcl and Ccl Reduced Due to Voltage Fail Safe",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.ERROR,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .DclAndCclReducedDueToCommunicationFailsafe,
            },
          ],
          isFault: true,
          name: "Dcl and Ccl Reduced Due to Communication Fail Safe",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings.CclReducedDueToHighSoc,
            },
          ],
          isFault: true,
          name: "Ccl Reduced Due to High Soc",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighCellResistance,
            },
          ],
          isFault: true,
          name: "Ccl Reduced to High Cell Resistance",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToTemperature,
            },
          ],
          isFault: true,
          name: "Ccl Reduced Due to Temperature",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighCellVoltage,
            },
          ],
          isFault: true,
          name: "Ccl Reduced Due to High Cell Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToHighPackVoltage,
            },
          ],
          isFault: true,
          name: "Ccl Reduced Due to High Pack Voltage",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToChargerLatch,
            },
          ],
          isFault: true,
          name: "Ccl Reduced Due to Charger Latch",
        },
        {
          data: [
            {
              indicationLocation: FaultLocations.BATTERY,
              severity: ISeverity.WARNING,
              value:
                currentPacket?.BatteryFaults.Warnings
                  .CclReducedDueToAlternateCurrentLimit,
            },
          ],
          isFault: true,
          name: "Ccl Reduced Due to Alternate Current Limit",
        },
      ],
    },
    MotorFaults: {
      MotorLeft: {
        ErrorFlags: [
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .CanCommsTimeoutError,
              },
            ],
            isFault: true,
            name: "Can Comms Timeout Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .ErrorInDclinkCommunication,
              },
            ],
            isFault: true,
            name: "Error in DC Link Communication",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.ErrorReadingEncoder,
              },
            ],
            isFault: true,
            name: "Error Reading Encoder",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .ErrorReadingTempSensor,
              },
            ],
            isFault: true,
            name: "Error Reading Temp Sensor",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorDetails0?.MotorErrors.OverspeedError,
              },
            ],
            isFault: true,
            name: "Motor Over Speed",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.Inverter1FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 1 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .Inverter1OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 1 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.Inverter2FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 2 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .Inverter2OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 2 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.Inverter3FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 3 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .Inverter3OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 3 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.Inverter4FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 4 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .Inverter4OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 4 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.Inverter5FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 5 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .Inverter5OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 5 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.Inverter6FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 6 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .Inverter6OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 6 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.DcOvervoltageError,
              },
            ],
            isFault: true,
            name: "Dc Bus Over Voltage",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors.DcUndervoltageError,
              },
            ],
            isFault: true,
            name: "Dc Bus Under Voltage Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .InvalidHallSensorSequence, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Bad Motor Position Hall Sequence",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .PositionSensorReadingError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Position Sensor Reading Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorErrors
                    .LostFramesOnCanBusError,
              },
            ],
            isFault: true,
            name: "Lost Frame on Can Bus Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0.MotorErrors
                    .ControllerDataReadingTimeout,
              },
            ],
            isFault: true,
            name: "Config Read Error",
          },
        ],
        WarningFlags: [
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .CanCommsTimeoutWarning,
              },
            ],
            isFault: true,
            name: "Can Comms Timeout Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings.OverspeedWarning,
              },
            ],
            isFault: true,
            name: "Motor Over Speed",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter1FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 1 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter1OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 1 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter2FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 2 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter2OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 2 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter3FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 3 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter3OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 3 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter4FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 4 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter4OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 4 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter5FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 5 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter5OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 5 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter6FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 6 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .Inverter6OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 6 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .DcOvervoltageWarning,
              },
            ],
            isFault: true,
            name: "Dc Bus Over Voltage",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .DcUndervoltageWarning,
              },
            ],
            isFault: true,
            name: "Dc Bus Under Voltage Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails0?.MotorWarnings
                    .LostFramesOnCanBusWarning,
              },
            ],
            isFault: true,
            name: "Lost Frame on Can Bus Error",
          },
        ],
      },
      MotorRight: {
        ErrorFlags: [
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .CanCommsTimeoutError,
              },
            ],
            isFault: true,
            name: "Can Comms Timeout Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .ErrorInDclinkCommunication,
              },
            ],
            isFault: true,
            name: "Error in DC Link Communication",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.ErrorReadingEncoder,
              },
            ],
            isFault: true,
            name: "Error Reading Encoder",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .ErrorReadingTempSensor,
              },
            ],
            isFault: true,
            name: "Error Reading Temp Sensor",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value: currentPacket?.MotorDetails1?.MotorErrors.OverspeedError,
              },
            ],
            isFault: true,
            name: "Motor Over Speed",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.Inverter1FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 1 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .Inverter1OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 1 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.Inverter2FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 2 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .Inverter2OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 2 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.Inverter3FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 3 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .Inverter3OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 3 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.Inverter4FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 4 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .Inverter4OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 4 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.Inverter5FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 5 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .Inverter5OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 5 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.Inverter6FaultError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 6 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .Inverter6OvercurrentError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 6 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.DcOvervoltageError,
              },
            ],
            isFault: true,
            name: "Dc Bus Over Voltage",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors.DcUndervoltageError,
              },
            ],
            isFault: true,
            name: "Dc Bus Under Voltage Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .InvalidHallSensorSequence, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Bad Motor Position Hall Sequence",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .PositionSensorReadingError, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Position Sensor Reading Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .LostFramesOnCanBusError,
              },
            ],
            isFault: true,
            name: "Lost Frame on Can Bus Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorErrors
                    .ControllerDataReadingTimeout,
              },
            ],
            isFault: true,
            name: "Config Read Error",
          },
        ],
        WarningFlags: [
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .CanCommsTimeoutWarning,
              },
            ],
            isFault: true,
            name: "Can Comms Timeout Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings.OverspeedWarning,
              },
            ],
            isFault: true,
            name: "Motor Over Speed",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter1FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 1 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter1OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 1 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter2FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 2 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter2OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 2 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter3FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 3 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter3OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 3 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter4FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 4 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter4OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 4 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter5FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 5 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter5OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 5 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter6FaultWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 6 Fault Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .Inverter6OverCurrentWarning, // this doesn't exist in the packet anymore I think
              },
            ],
            isFault: true,
            name: "Inverter 6 Overcurrent Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .DcOvervoltageWarning,
              },
            ],
            isFault: true,
            name: "Dc Bus Over Voltage",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .DcUndervoltageWarning,
              },
            ],
            isFault: true,
            name: "Dc Bus Under Voltage Error",
          },
          {
            data: [
              {
                indicationLocation: FaultLocations.LEFTMOTOR,
                severity: ISeverity.WARNING,
                value:
                  currentPacket?.MotorDetails1?.MotorWarnings
                    .LostFramesOnCanBusWarning,
              },
            ],
            isFault: true,
            name: "Lost Frame on Can Bus Error",
          },
        ],
      },
    },
  };

  return data as I_PIS;
};

export default Faults;
