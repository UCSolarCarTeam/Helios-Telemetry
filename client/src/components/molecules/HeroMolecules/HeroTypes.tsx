export enum ISeverity {
  ERROR,
  WARNING,
  CLEAR,
}

export enum FaultLocations {
  LEFTMOTOR,
  RIGHTMOTOR,
  BATTERY,
  SOLARPANEL,
  OTHER,
}

export type IndicationLocations = {
  leftMotor: ISeverity;
  rightMotor: ISeverity;
  battery: ISeverity;
  solarPanel: ISeverity;
};
