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
}

export type IndicationLocations = {
  leftMotor: ISeverity;
  rightMotor: ISeverity;
  battery: ISeverity;
  solarPanel: ISeverity;
};
