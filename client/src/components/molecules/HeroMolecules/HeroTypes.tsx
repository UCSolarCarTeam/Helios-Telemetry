export enum ISeverity {
  ERROR,
  WARNING,
  CLEAR,
}

export type IndicationLocations = {
  leftMotor: ISeverity;
  rightMotor: ISeverity;
  battery: ISeverity;
  solarPanel: ISeverity;
};
