export const calculateVehicleVelocity = (
  currentRpmValueMotor0?: number,
  currentRpmValueMotor1?: number,
) => {
  if (
    currentRpmValueMotor0 !== undefined &&
    currentRpmValueMotor1 !== undefined
  ) {
    const velocityMotor0 =
      (2 * Math.PI * 0.15 * currentRpmValueMotor0 * 3.6) / 60; // Calculate velocity in km/h using wheel radius of 0.15m
    const velocityMotor1 =
      (2 * Math.PI * 0.15 * currentRpmValueMotor1 * 3.6) / 60; // Calculate velocity in km/h using wheel radius of 0.15m

    const averageVelocity = (velocityMotor0 + velocityMotor1) / 2; // average velocity of both motors

    return averageVelocity;
  }
  return 0;
};
