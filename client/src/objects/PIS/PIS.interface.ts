import type {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";

enum UnitType {
  TEMP = "temperature",
  SPEED = "speed",
  DISTANCE = "distance",
  VOLTAGE = "V",
  AMPERAGE = "A",
  AMPHOUR = "Ah",
  MILLIVOLTS = "mV",
  RPM = "RPM",
  AMPRMS = "A(rms)",
  HERTZ = "Hz",
}

type I_PISFieldData = {
  value: number | string | boolean;
  unit?: UnitType;
  min?: number;
  max?: number;
  expectedBool?: boolean;
  hover?: string;
  severity: ISeverity;
  indiciationLocation: FaultLocations;
};

type I_PISField = {
  name: string;
  fstring?: string;
  data: I_PISFieldData[];
};

type I_PIS = {
  [id: string]: I_PISField[] | I_PIS;
};

export default I_PIS;
export type { I_PISField, I_PISFieldData };
export { UnitType };
