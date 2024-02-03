export enum IndicationStates {
  RED,
  ORANGE,
  CLEAR,
}

export type IndicationLocations = {
  leftMotor: IndicationStates;
  rightMotor: IndicationStates;
  battery: IndicationStates;
  solarPanel: IndicationStates;
};
